import RedisStore, { type RedisReply } from "rate-limit-redis";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { redis } from "@/infrastructure/redis/redis-client";
import { Request } from "express";

const normalizeUrl = (url: string): string => {
  let normalized = url.toLowerCase();

  normalized = normalized.split("?")[0];
  normalized = normalized.replace(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g,
    ":id",
  );

  normalized = normalized.replace(/\/(\d+)/g, "/:id");

  if (normalized.endsWith("/") && normalized.length > 1) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
};

const createEndpointKey = (req: Request) => {
  const userKey = req.user?.id || ipKeyGenerator(req.ip || "127.0.0.1");
  const endpoint = normalizeUrl(req.originalUrl);

  return `${userKey}:${req.method}:${endpoint}`;
};

export const generalLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) =>
      redis.call(args[0], ...args.slice(1)) as Promise<RedisReply>,
    prefix: "rl:general",
  }),
  windowMs: 5 * 60 * 1000,
  max: 300,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      errors: [
        {
          message: options.message,
        },
      ],
    });
  },
  message: "Too many requests, please try again later.",

  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?.id || ipKeyGenerator(req.ip || "127.0.0.1") || "unknown";
  },
});

export const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) =>
      redis.call(args[0], ...args.slice(1)) as Promise<RedisReply>,
    prefix: "rl:auth",
  }),
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      errors: [
        {
          message: options.message,
        },
      ],
    });
  },
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts, please try again later.",
  keyGenerator: createEndpointKey,
});

export const writeLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) =>
      redis.call(args[0], ...args.slice(1)) as Promise<RedisReply>,
    prefix: "rl:write",
  }),
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      errors: [
        {
          message: options.message,
        },
      ],
    });
  },
  windowMs: 1 * 60 * 1000,
  max: 30,
  skip: (req) => req.method === "GET",
  message: "Too many actions, please slow down.",
  keyGenerator: createEndpointKey,
});

export const wsAuthLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) =>
      redis.call(args[0], ...args.slice(1)) as Promise<RedisReply>,
    prefix: "rl:ws-auth",
  }),

  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      errors: [
        {
          message: options.message,
        },
      ],
    });
  },
  windowMs: 1 * 60 * 1000,
  max: 15,
  message: "You are browsing too fast!",
  keyGenerator: createEndpointKey,
});
