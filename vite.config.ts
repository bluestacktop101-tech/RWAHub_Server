import path from "node:path";
import { pathToFileURL } from "node:url";
import { loadEnv } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

function catalogApiPlugin() {
  return {
    name: "catalog-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url || "").split("?")[0];
        if (
          pathname !== "/health" &&
          pathname !== "/sync" &&
          pathname !== "/getkey" &&
          pathname !== "/server-log" &&
          !pathname.startsWith("/server-log/") &&
          !pathname.startsWith("/records/")
        ) {
          next();
          return;
        }
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,OPTIONS");
          res.setHeader("Access-Control-Allow-Headers", "Content-Type");
          res.end();
          return;
        }
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(Buffer.from(chunk));
          const raw = Buffer.concat(chunks).toString("utf8");
          const requestType = String(req.headers["content-type"] || "");
          let body: Record<string, string> = {};
          if (raw && requestType.includes("application/json")) {
            try {
              body = JSON.parse(raw);
            } catch {
              body = {};
            }
          } else if (raw) {
            body = Object.fromEntries(new URLSearchParams(raw));
          }
          const mod = await import(pathToFileURL(path.resolve("server/catalog-api.mjs")).href);
          const result = await mod.handleCatalog(req.method || "GET", pathname, body, {
            cookie: req.headers.cookie || "",
          });
          const contentType = result?.contentType || "application/json";
          res.statusCode = result?.status || 404;
          if (result?.headers) {
            for (const [key, value] of Object.entries(result.headers)) {
              res.setHeader(key, String(value));
            }
          }
          res.setHeader("Content-Type", contentType);
          res.setHeader("Access-Control-Allow-Origin", "*");
          if (result?.emptyBody) {
            res.end();
            return;
          }
          const payload = contentType.includes("text/html")
            ? String(result?.body ?? "")
            : JSON.stringify(result?.body ?? { error: "Route not found" });
          res.end(payload);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

/**
 * Nitro's dev middleware expects the `ssr` Vite environment (normally registered by
 * `@cloudflare/vite-plugin`). Lovable only enables that plugin during `vite build`, so
 * `vite dev` hits: NitroViteError — Vite environment "ssr" is unavailable.
 *
 * TanStack Start does not need the Nitro Vite plugin during local dev (only for the
 * production Nitro bundle). Omit `nitro()` while `command === "serve"`.
 */
export default defineConfig(async (env) => {
  const fileEnv = loadEnv(env.mode, process.cwd(), "");
  const supabaseUrl =
    fileEnv.VITE_SUPABASE_URL ||
    fileEnv.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";
  const supabaseKey =
    fileEnv.VITE_SUPABASE_PUBLISHABLE_KEY ||
    fileEnv.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    "";

  return {
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(supabaseUrl),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(supabaseKey),
    },
    resolve: {
      alias: {
        "cloudflare:sockets": path.resolve("server/cloudflare-sockets-shim.mjs"),
      },
    },
    plugins: [
      catalogApiPlugin(),
      ...(env.command === "build" ? [nitro({ serverDir: path.resolve("server") })] : []),
    ],
  };
});
