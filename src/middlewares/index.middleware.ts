import type { AppOpenAPI } from "@/lib/types";
import { logger } from "./logger";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { parseEnv } from "@/env";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config());

export default function configureMiddlewares(app: AppOpenAPI) {
  app.use(async (c, next) => {
    parseEnv(Object.assign(c.env || {}, process.env));
    return await next();
  });
  app.use(serveEmojiFavicon("🔥"));
  app.use(logger());
  app.notFound(notFound);
  app.onError(onError);
}
