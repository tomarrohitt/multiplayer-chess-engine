import {
  authLimiter,
  generalLimiter,
  writeLimiter,
  wsAuthLimiter,
} from "@/lib/utils/rate-limiter";
import { Request, Response, NextFunction } from "express";

export const selectRateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const path = req.originalUrl;
  const method = req.method;

  if (path.startsWith("/api/health") || path.startsWith("/api/keep-alive")) {
    return next();
  }
  if (
    path.startsWith("/api/health/stream") ||
    path.startsWith("/api/ws/ticket")
  ) {
    return wsAuthLimiter(req, res, next);
  }

  if (path.startsWith("/api/auth") && method !== "GET") {
    return authLimiter(req, res, next);
  }

  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    return writeLimiter(req, res, next);
  }
  return generalLimiter(req, res, next);
};
