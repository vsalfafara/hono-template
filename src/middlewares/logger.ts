import env from "@/env";
import { pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

export function logger() {
  return pinoLogger({
    pino: pino(
      { level: env.LOG_LEVEL || "info" },
      env.NODE_ENV === "production" ? undefined : pretty()
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
