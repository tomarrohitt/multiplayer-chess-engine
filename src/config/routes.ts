export interface RouteRule {
  method: "ALL" | "GET" | "POST" | "PUT" | "DELETE";
  protected: boolean;
}

export interface RouteConfig {
  path: string;
  rules: RouteRule[];
}

export const routeConfigs: RouteConfig[] = [
  {
    path: "/api/keep-alive",
    rules: [{ method: "GET", protected: false }],
  },
  {
    path: "/api/health",
    rules: [{ method: "GET", protected: false }],
  },
  {
    path: "/api/ws/ticket",
    rules: [{ method: "ALL", protected: true }],
  },
  {
    path: "/api/health/stream",
    rules: [{ method: "ALL", protected: true }],
  },
  {
    path: "/api/auth",
    rules: [{ method: "ALL", protected: false }],
  },
  {
    path: "/api/user",
    rules: [{ method: "ALL", protected: true }],
  },
  {
    path: "/api/games",
    rules: [{ method: "ALL", protected: true }],
  },

  {
    path: "/api/friends",
    rules: [{ method: "ALL", protected: true }],
  },

  {
    path: "/api/chat",
    rules: [{ method: "ALL", protected: true }],
  },
];
