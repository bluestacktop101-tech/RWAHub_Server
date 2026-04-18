import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

/**
 * Nitro's dev middleware expects the `ssr` Vite environment (normally registered by
 * `@cloudflare/vite-plugin`). Lovable only enables that plugin during `vite build`, so
 * `vite dev` hits: NitroViteError — Vite environment "ssr" is unavailable.
 *
 * TanStack Start does not need the Nitro Vite plugin during local dev (only for the
 * production Nitro bundle). Omit `nitro()` while `command === "serve"`.
 */
export default defineConfig(async (env) => ({
  plugins: env.command === "build" ? [nitro()] : [],
}));
