globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { H as HTTPError, d as defineHandler, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs").then(function(n) {
    return n.a1;
  }))
};
globalThis.__nitro_vite_envs__ = services;
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/.assetsignore": {
    "type": "text/plain; charset=utf-8",
    "etag": '"18-XSz3wAtMfGDWUd9kMIgQd2pcOYA"',
    "mtime": "2026-10-22T18:30:35.840Z",
    "size": 24,
    "path": "../public/.assetsignore"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"3b2ce-fH+GANNFETfLqplheJm+xr59Lbc"',
    "mtime": "2026-03-30T05:09:12.247Z",
    "size": 242382,
    "path": "../public/favicon.ico"
  },
  "/assets/about-CLpesj7N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"884-IFvB5vak01jTmfxtx4gUcMsLjTU"',
    "mtime": "2026-10-22T18:30:35.802Z",
    "size": 2180,
    "path": "../public/assets/about-CLpesj7N.js"
  },
  "/assets/apply-JxgdH8Nf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32834-4Wkb7eoXGWc7ckN4IU4iYl0cvHo"',
    "mtime": "2026-10-22T18:30:35.810Z",
    "size": 206900,
    "path": "../public/assets/apply-JxgdH8Nf.js"
  },
  "/assets/assets-D8bch4Cq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"98e0-3uq6bwMJ9LR94pV3DPBPuZVBFzw"',
    "mtime": "2026-10-22T18:30:35.810Z",
    "size": 39136,
    "path": "../public/assets/assets-D8bch4Cq.js"
  },
  "/assets/contact-CBA64wzP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e5-rAZTq0ycssIMC+6VHCuqPMU+UMY"',
    "mtime": "2026-10-22T18:30:35.810Z",
    "size": 4325,
    "path": "../public/assets/contact-CBA64wzP.js"
  },
  "/assets/eye-CriZ7L74.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-dlJVy0Xd/Onu/c3ueVu36NflGjU"',
    "mtime": "2026-10-22T18:30:35.802Z",
    "size": 257,
    "path": "../public/assets/eye-CriZ7L74.js"
  },
  "/assets/hero-bg-CSrCFAMi.jpg": {
    "type": "image/jpeg",
    "etag": '"109bf-SSh+thw/uYnioFsn6XF0Mndinn8"',
    "mtime": "2026-10-22T18:30:35.801Z",
    "size": 68031,
    "path": "../public/assets/hero-bg-CSrCFAMi.jpg"
  },
  "/assets/hiring-oghMA4pf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8034-ipxGxjIM+hr7RiRNvnum4dVse98"',
    "mtime": "2026-10-22T18:30:35.835Z",
    "size": 32820,
    "path": "../public/assets/hiring-oghMA4pf.js"
  },
  "/assets/index-CN8ILepE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a95-8AC1PkrIMpZ7zHvyv9XXd/ELPzI"',
    "mtime": "2026-10-22T18:30:35.810Z",
    "size": 10901,
    "path": "../public/assets/index-CN8ILepE.js"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0"',
    "mtime": "2026-04-14T21:54:21.000Z",
    "size": 160,
    "path": "../public/robots.txt"
  },
  "/assets/lock-JjQOHaNh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21c-K6LagYpnn1man3WbOKDJd1i/7wo"',
    "mtime": "2026-10-22T18:30:35.832Z",
    "size": 540,
    "path": "../public/assets/lock-JjQOHaNh.js"
  },
  "/assets/map-pin-zd4DDS9V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"104-WPjRIblpZEWvKlpobwkYPtgWptE"',
    "mtime": "2026-10-22T18:30:35.811Z",
    "size": 260,
    "path": "../public/assets/map-pin-zd4DDS9V.js"
  },
  "/assets/index-DW_sTp59.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4f6f7-/0GXa++JMeh1ZDpQxHzdt1V7Oho"',
    "mtime": "2026-10-22T18:30:35.802Z",
    "size": 325367,
    "path": "../public/assets/index-DW_sTp59.js"
  },
  "/assets/SectionHeader-DKSq53t4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2e0-lzXOnRH5WzQtCoyVIbpam9URoyw"',
    "mtime": "2026-10-22T18:30:35.849Z",
    "size": 736,
    "path": "../public/assets/SectionHeader-DKSq53t4.js"
  },
  "/assets/PageLayout-D1kDTDjy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2070d-KyN00VI8U9itAF4OmW5BPk+f7/k"',
    "mtime": "2026-10-22T18:30:35.859Z",
    "size": 132877,
    "path": "../public/assets/PageLayout-D1kDTDjy.js"
  },
  "/assets/send-CXiJFWHr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"128-a9b/ljSMSe3lTD7ngfngwGFqcUE"',
    "mtime": "2026-10-22T18:30:35.811Z",
    "size": 296,
    "path": "../public/assets/send-CXiJFWHr.js"
  },
  "/assets/services-Dj1YS12T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c75-thQqk+N74AWhD7QHY3/eDt3YBz8"',
    "mtime": "2026-10-22T18:30:35.814Z",
    "size": 3189,
    "path": "../public/assets/services-Dj1YS12T.js"
  },
  "/assets/team-2Tl5ImZx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"58f-LHQihPJTJSwsWA1qrdeNGe2evVU"',
    "mtime": "2026-10-22T18:30:35.841Z",
    "size": 1423,
    "path": "../public/assets/team-2Tl5ImZx.js"
  },
  "/placeholder.svg": {
    "type": "image/svg+xml",
    "etag": '"6fd1-qWQOhyJn/rRMFfFPaVsAALDm3NY"',
    "mtime": "2026-04-14T21:54:21.000Z",
    "size": 28625,
    "path": "../public/placeholder.svg"
  },
  "/assets/technology-kIDsrTQQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1250-voJR1kioWeCBDGNhOkMrKfn/Nlo"',
    "mtime": "2026-10-22T18:30:35.815Z",
    "size": 4688,
    "path": "../public/assets/technology-kIDsrTQQ.js"
  },
  "/assets/styles-CmsxBJiX.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"149c3-6GSFj4O4rqHhtacK5+Qaf4gtn+w"',
    "mtime": "2026-10-22T18:30:35.801Z",
    "size": 84419,
    "path": "../public/assets/styles-CmsxBJiX.css"
  },
  "/assets/wallet-Aa6RvvR_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"124-xQUQ2A4RRKXYpHtmEbtlbjErHhU"',
    "mtime": "2026-10-22T18:30:35.812Z",
    "size": 292,
    "path": "../public/assets/wallet-Aa6RvvR_.js"
  },
  "/assets/trending-up-DM_mOIzf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a-7Ks6A9vMU8aC6zMOOl9ZVBs27WQ"',
    "mtime": "2026-10-22T18:30:35.810Z",
    "size": 298,
    "path": "../public/assets/trending-up-DM_mOIzf.js"
  },
  "/team/mykhailo.jpg": {
    "type": "image/jpeg",
    "etag": '"1f5f-JJChpkbvLD+u+XZLbpNSYonTMc0"',
    "mtime": "2026-04-14T21:54:21.000Z",
    "size": 8031,
    "path": "../public/team/mykhailo.jpg"
  },
  "/team/John.jpg": {
    "type": "image/jpeg",
    "etag": '"ae36-bpxtm6gYbzfvMh7iHBbJ9bP/0QQ"',
    "mtime": "2026-04-14T21:54:21.000Z",
    "size": 44598,
    "path": "../public/team/John.jpg"
  },
  "/team/Robert.jpg": {
    "type": "image/jpeg",
    "etag": '"2cbf-/J2yJs+H9LGTB6iAGtW08NUB3Rw"',
    "mtime": "2026-04-14T21:54:21.000Z",
    "size": 11455,
    "path": "../public/team/Robert.jpg"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": '"f83fe-bTFZkpGKwvJDHDm+Q062R8Pg2rM"',
    "mtime": "2026-06-05T04:52:07.815Z",
    "size": 1016830,
    "path": "../public/logo.png"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _6iNYpb = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_U8TL8_ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_U8TL8_ };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_6iNYpb)
].filter(Boolean);
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  for (const rule of Object.values(routeRules)) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
