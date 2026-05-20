export const Keys = {
  game: (gameId: string) => `game_${gameId}`,
  queue: (timeControl: string) => `matchmaking:queue${timeControl}`,
  lockMatchMaking: (userId: string) => `lock:matchmaking:${userId}`,
  timerJob: (gameId: string) => `timer_${gameId}`,
  reconnectJob: (gameId: string, userId: string) =>
    `reconnect_${gameId}_${userId}`,
  session: (userId: string) => `session_${userId}`,
  userActiveGame: (userId: string) => `user_${userId}:activeGame`,
  drawOffer: (userId: string) => `draw_offer_${userId}`,
  getBlockedUsersCacheKey: (userId: string) => `blocked_users:${userId}`,
  getBlockedIdsCacheKey: (userId: string) => `blocked_ids:${userId}`,
  wsRateLimitKey: (
    prefix: string,
    userId: string,
    event: string,
    currentTimestamp: number,
  ) => `rl:ws:${prefix}:${userId}:${event}:${currentTimestamp}`,
};
