import { redis } from "@/infrastructure/redis/redis-client";
import { WsMessageType } from "@/types/types";

export type WsEventCategory =
  | "game_action"
  | "chat"
  | "matchmaking"
  | "challenge"
  | "sync"
  | "utility";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
  limitedBy?: "global" | WsEventCategory;
}

interface LimitConfig {
  windowMs: number;
  max: number;
  prefix: string;
  message: string;
}

const CATEGORY_CONFIGS: Record<WsEventCategory, LimitConfig> = {
  game_action: {
    windowMs: 5_000,
    max: 15,
    prefix: "ws:rl:game",
    message: "Too many game actions. Slow down.",
  },
  chat: {
    windowMs: 10_000,
    max: 8,
    prefix: "ws:rl:chat",
    message: "Sending messages too quickly.",
  },
  matchmaking: {
    windowMs: 60_000,
    max: 12,
    prefix: "ws:rl:queue",
    message: "Too many queue join/leave actions.",
  },
  challenge: {
    windowMs: 60_000,
    max: 10,
    prefix: "ws:rl:challenge",
    message: "Too many challenge requests.",
  },
  sync: {
    windowMs: 60_000,
    max: 20,
    prefix: "ws:rl:sync",
    message: "Too many sync/spectate requests.",
  },
  utility: {
    windowMs: 60_000,
    max: 120,
    prefix: "ws:rl:util",
    message: "Too many utility requests.",
  },
};

const GLOBAL_CONFIG: LimitConfig = {
  windowMs: 60_000,
  max: 300,
  prefix: "ws:rl:global",
  message: "Global rate limit exceeded. Please slow down.",
};

const EVENT_CATEGORY: Partial<Record<WsMessageType, WsEventCategory>> = {
  [WsMessageType.MAKE_MOVE]: "game_action",
  [WsMessageType.OFFER_DRAW]: "game_action",
  [WsMessageType.ACCEPT_DRAW]: "game_action",
  [WsMessageType.DECLINE_DRAW]: "game_action",
  [WsMessageType.OFFER_REMATCH]: "game_action",
  [WsMessageType.ACCEPT_REMATCH]: "game_action",
  [WsMessageType.DECLINE_REMATCH]: "game_action",
  [WsMessageType.RESIGN_GAME]: "game_action",
  [WsMessageType.GAME_ABORTED]: "game_action",

  [WsMessageType.SEND_CHAT_MESSAGE]: "chat",
  [WsMessageType.SEND_GAME_CHAT]: "chat",

  [WsMessageType.JOIN_QUEUE]: "matchmaking",
  [WsMessageType.LEAVE_QUEUE]: "matchmaking",

  [WsMessageType.OFFER_CHALLENGE]: "challenge",
  [WsMessageType.DECLINE_CHALLENGE]: "challenge",
  [WsMessageType.ACCEPT_CHALLENGE]: "challenge",

  [WsMessageType.SYNC_GAME]: "sync",
  [WsMessageType.SPECTATE_GAME]: "sync",
  [WsMessageType.LEAVE_SPECTATOR]: "sync",

  [WsMessageType.PING]: "utility",
  [WsMessageType.MARK_CHAT_READ]: "utility",
  [WsMessageType.MARK_ALL_CHATS_READ]: "utility",
  [WsMessageType.JOIN_GAME_CHAT]: "utility",
  [WsMessageType.LEAVE_GAME_CHAT]: "utility",
};

const SLIDING_WINDOW_SCRIPT = `
local key        = KEYS[1]
local now        = tonumber(ARGV[1])
local window_ms  = tonumber(ARGV[2])
local max        = tonumber(ARGV[3])
local member     = ARGV[4]

local cutoff = now - window_ms

redis.call('ZREMRANGEBYSCORE', key, '-inf', cutoff)

local count = redis.call('ZCARD', key)

if count >= max then
  -- Return oldest member score so the caller can compute retryAfter
  local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
  local oldest_ts = oldest[2] and tonumber(oldest[2]) or now
  return { 0, count, oldest_ts }
end

redis.call('ZADD', key, now, member)
redis.call('PEXPIRE', key, window_ms)

return { 1, count + 1, 0 }
`;

async function slidingWindowCheck(
  key: string,
  config: LimitConfig,
): Promise<{ allowed: boolean; remaining: number; retryAfterMs: number }> {
  const now = Date.now();
  const member = `${now}-${Math.random().toString(36).slice(2, 7)}`;

  const [allowed, used, oldestTs] = (await redis.eval(
    SLIDING_WINDOW_SCRIPT,
    1,
    key,
    String(now),
    String(config.windowMs),
    String(config.max),
    member,
  )) as [number, number, number];

  const remaining = Math.max(0, config.max - used);
  const retryAfterMs =
    allowed === 0 ? Math.max(0, config.windowMs - (now - oldestTs)) : 0;

  return { allowed: allowed === 1, remaining, retryAfterMs };
}

export async function checkWsRateLimit(
  userId: string,
  eventType: WsMessageType,
): Promise<RateLimitResult> {
  const category = EVENT_CATEGORY[eventType];

  if (!category) {
    return { allowed: true, remaining: 0, retryAfterMs: 0 };
  }

  const categoryConfig = CATEGORY_CONFIGS[category];
  const categoryKey = `${categoryConfig.prefix}:${userId}`;
  const globalKey = `${GLOBAL_CONFIG.prefix}:${userId}`;

  const [categoryResult, globalResult] = await Promise.all([
    slidingWindowCheck(categoryKey, categoryConfig),
    slidingWindowCheck(globalKey, GLOBAL_CONFIG),
  ]);

  if (!globalResult.allowed) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: globalResult.retryAfterMs,
      limitedBy: "global",
    };
  }

  if (!categoryResult.allowed) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: categoryResult.retryAfterMs,
      limitedBy: category,
    };
  }

  return {
    allowed: true,
    remaining: categoryResult.remaining,
    retryAfterMs: 0,
  };
}

export function getRateLimitMessage(
  limitedBy: "global" | WsEventCategory,
): string {
  if (limitedBy === "global") return GLOBAL_CONFIG.message;
  return CATEGORY_CONFIGS[limitedBy].message;
}
