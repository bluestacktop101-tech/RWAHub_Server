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
    "mtime": "2026-11-16T19:58:38.833Z",
    "size": 24,
    "path": "../public/.assetsignore"
  },
  "/assets/about-Csue2zVs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"884-XK/mCQy8C89vTjR9CtKFL7/YQ2k"',
    "mtime": "2026-11-16T19:58:38.803Z",
    "size": 2180,
    "path": "../public/assets/about-Csue2zVs.js"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"3b2ce-fH+GANNFETfLqplheJm+xr59Lbc"',
    "mtime": "2026-03-30T05:09:12.247Z",
    "size": 242382,
    "path": "../public/favicon.ico"
  },
  "/assets/apply-B97uUywr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32834-FNztdfKLVMjgkD5NS4ovHJCDc+E"',
    "mtime": "2026-11-16T19:58:38.811Z",
    "size": 206900,
    "path": "../public/assets/apply-B97uUywr.js"
  },
  "/assets/assets-CqncwbBh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"98e0-JM4UrWcCU/JeX+LMJBSBL509qw8"',
    "mtime": "2026-11-16T19:58:38.812Z",
    "size": 39136,
    "path": "../public/assets/assets-CqncwbBh.js"
  },
  "/assets/contact-BUSatCEe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10e5-b7SGv+SHxT4o8cNN4Yu0t5Ov1/A"',
    "mtime": "2026-11-16T19:58:38.815Z",
    "size": 4325,
    "path": "../public/assets/contact-BUSatCEe.js"
  },
  "/assets/eye-BjxcfxkF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"101-uOnfg8zk3I/KxTg7g84WFUsvJGA"',
    "mtime": "2026-11-16T19:58:38.811Z",
    "size": 257,
    "path": "../public/assets/eye-BjxcfxkF.js"
  },
  "/assets/hero-bg-CSrCFAMi.jpg": {
    "type": "image/jpeg",
    "etag": '"109bf-SSh+thw/uYnioFsn6XF0Mndinn8"',
    "mtime": "2026-11-16T19:58:38.802Z",
    "size": 68031,
    "path": "../public/assets/hero-bg-CSrCFAMi.jpg"
  },
  "/assets/hiring-BHf0xJYB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8034-ZYZBzfF5jJX3qEtmRs7rUiKvfDM"',
    "mtime": "2026-11-16T19:58:38.818Z",
    "size": 32820,
    "path": "../public/assets/hiring-BHf0xJYB.js"
  },
  "/assets/index-Cl85sS2V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2a95-xxwPdPH2NbGvlC60s/l8BWc+jXU"',
    "mtime": "2026-11-16T19:58:38.802Z",
    "size": 10901,
    "path": "../public/assets/index-Cl85sS2V.js"
  },
  "/assets/lock-CakLWErY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21c-yTJ3zsn+aRXVQURV7Y8Dopb3rr8"',
    "mtime": "2026-11-16T19:58:38.832Z",
    "size": 540,
    "path": "../public/assets/lock-CakLWErY.js"
  },
  "/assets/index-6uL01-Bm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4f6f7-pdtTcww82QrZz54EZYiT85ujXnc"',
    "mtime": "2026-11-16T19:58:38.802Z",
    "size": 325367,
    "path": "../public/assets/index-6uL01-Bm.js"
  },
  "/assets/map-pin-CafWmY9E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"104-Ax1eIfOhGMt2sf/x8zalwLZb7aM"',
    "mtime": "2026-11-16T19:58:38.818Z",
    "size": 260,
    "path": "../public/assets/map-pin-CafWmY9E.js"
  },
  "/assets/PageLayout-DuH9s40G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2070d-E/J940n7k9z5NwctUnZEP8hMhnM"',
    "mtime": "2026-11-16T19:58:38.845Z",
    "size": 132877,
    "path": "../public/assets/PageLayout-DuH9s40G.js"
  },
  "/assets/SectionHeader-DPOCMYUo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2e0-0c9WcNFkBIBWZCkNEXZg6HzC+7I"',
    "mtime": "2026-11-16T19:58:38.844Z",
    "size": 736,
    "path": "../public/assets/SectionHeader-DPOCMYUo.js"
  },
  "/assets/send-jZ4_KFvV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"128-3jhghO/he6c0Qt2xn7doJ9Jc0HQ"',
    "mtime": "2026-11-16T19:58:38.813Z",
    "size": 296,
    "path": "../public/assets/send-jZ4_KFvV.js"
  },
  "/assets/services-BVWOBLe-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c75-aglsA0HQm9U2x1/i7qmvfNui7/o"',
    "mtime": "2026-11-16T19:58:38.818Z",
    "size": 3189,
    "path": "../public/assets/services-BVWOBLe-.js"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0"',
    "mtime": "2026-04-14T21:54:21.000Z",
    "size": 160,
    "path": "../public/robots.txt"
  },
  "/assets/styles-BqNJy6Oo.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"14ac2-4EDAlYg7mhYc8oVu0FDzqfmkUeA"',
    "mtime": "2026-11-16T19:58:38.802Z",
    "size": 84674,
    "path": "../public/assets/styles-BqNJy6Oo.css"
  },
  "/assets/team-DvSdHsJ_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"58f-/X/wvsYqnaGjOYrNwPFKqEl3smA"',
    "mtime": "2026-11-16T19:58:38.826Z",
    "size": 1423,
    "path": "../public/assets/team-DvSdHsJ_.js"
  },
  "/assets/technology-97s9PQSr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1250-dktvBtx3UC1WRZ80Cx64w7Xu7nQ"',
    "mtime": "2026-11-16T19:58:38.832Z",
    "size": 4688,
    "path": "../public/assets/technology-97s9PQSr.js"
  },
  "/assets/trending-up-5A-1R_2S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12a-pS+ODfwywcRBNZF0YXKdKFse2QA"',
    "mtime": "2026-11-16T19:58:38.812Z",
    "size": 298,
    "path": "../public/assets/trending-up-5A-1R_2S.js"
  },
  "/assets/wallet-DO0UWzz0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"124-LE2TsqCvPQ/V4r5Mx7qavHP++YA"',
    "mtime": "2026-11-16T19:58:38.818Z",
    "size": 292,
    "path": "../public/assets/wallet-DO0UWzz0.js"
  },
  "/placeholder.svg": {
    "type": "image/svg+xml",
    "etag": '"6fd1-qWQOhyJn/rRMFfFPaVsAALDm3NY"',
    "mtime": "2026-04-14T21:54:21.000Z",
    "size": 28625,
    "path": "../public/placeholder.svg"
  },
  "/team/John.jpg": {
    "type": "image/jpeg",
    "etag": '"ae36-bpxtm6gYbzfvMh7iHBbJ9bP/0QQ"',
    "mtime": "2026-04-14T21:54:21.000Z",
    "size": 44598,
    "path": "../public/team/John.jpg"
  },
  "/team/mykhailo.jpg": {
    "type": "image/jpeg",
    "etag": '"1f5f-JJChpkbvLD+u+XZLbpNSYonTMc0"',
    "mtime": "2026-04-14T21:54:21.000Z",
    "size": 8031,
    "path": "../public/team/mykhailo.jpg"
  },
  "/team/Robert.jpg": {
    "type": "image/jpeg",
    "etag": '"2cbf-/J2yJs+H9LGTB6iAGtW08NUB3Rw"',
    "mtime": "2026-04-14T21:54:21.000Z",
    "size": 11455,
    "path": "../public/team/Robert.jpg"
  },
  "/assets/hosted/pexels-1457983.jpeg": {
    "type": "image/jpeg",
    "etag": '"3e298-cnZrGn1p8jc/XVFJkcCOtQd5rrg"',
    "mtime": "2026-11-16T19:29:52.932Z",
    "size": 254616,
    "path": "../public/assets/hosted/pexels-1457983.jpeg"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": '"f83fe-bTFZkpGKwvJDHDm+Q062R8Pg2rM"',
    "mtime": "2026-06-05T04:52:07.815Z",
    "size": 1016830,
    "path": "../public/logo.png"
  },
  "/assets/hosted/pexels-190819.jpeg": {
    "type": "image/jpeg",
    "etag": '"9c2c7-wGS5adiu0ZJoMbVDXdpLCQ9vBOI"',
    "mtime": "2026-11-16T19:29:52.957Z",
    "size": 639687,
    "path": "../public/assets/hosted/pexels-190819.jpeg"
  },
  "/assets/hosted/pexels-3136673.jpeg": {
    "type": "image/jpeg",
    "etag": '"dcdba-84KupMqTJsR20Mlhzc4uGmPgXhU"',
    "mtime": "2026-11-16T19:29:54.286Z",
    "size": 904634,
    "path": "../public/assets/hosted/pexels-3136673.jpeg"
  },
  "/assets/collectibles/baseball-cards.png": {
    "type": "image/png",
    "etag": '"30ba2-rnkRmm5gjCvvK3iRqRAn9GtCXX0"',
    "mtime": "2025-05-20T23:31:16.705Z",
    "size": 199586,
    "path": "../public/assets/collectibles/baseball-cards.png"
  },
  "/assets/hosted/pexels-46274.jpeg": {
    "type": "image/jpeg",
    "etag": '"e535b-plqbSJFkaEY+84jgXgRSlG1Xf9I"',
    "mtime": "2026-11-16T19:29:54.207Z",
    "size": 938843,
    "path": "../public/assets/hosted/pexels-46274.jpeg"
  },
  "/assets/hosted/pexels-9978722.jpeg": {
    "type": "image/jpeg",
    "etag": '"c9475-eJFUKnU6aEM0z6h/aLFVcjiLQcw"',
    "mtime": "2026-11-16T19:29:54.175Z",
    "size": 824437,
    "path": "../public/assets/hosted/pexels-9978722.jpeg"
  },
  "/assets/hosted/pexels-1191531.jpeg": {
    "type": "image/jpeg",
    "etag": '"12f382-u0kcIlO7g+OhboZlKdryp+xbJHM"',
    "mtime": "2026-11-16T19:29:52.914Z",
    "size": 1241986,
    "path": "../public/assets/hosted/pexels-1191531.jpeg"
  },
  "/assets/hosted/pexels-1454171.jpeg": {
    "type": "image/jpeg",
    "etag": '"10eac8-rzyAabErPqAuaKxgR/3AtJJpu+U"',
    "mtime": "2026-11-16T19:29:53.085Z",
    "size": 1108680,
    "path": "../public/assets/hosted/pexels-1454171.jpeg"
  },
  "/assets/hosted/pexels-1661950.jpeg": {
    "type": "image/jpeg",
    "etag": '"10cecb-AlUdAXlgP5KHSj3Wz30ZzJEGDOc"',
    "mtime": "2026-11-16T19:29:53.151Z",
    "size": 1101515,
    "path": "../public/assets/hosted/pexels-1661950.jpeg"
  },
  "/assets/hosted/pexels-32870.jpg": {
    "type": "image/jpeg",
    "etag": '"12d887-XXju+oovaPaPcQU6aYYMPPHBE6w"',
    "mtime": "2026-11-16T19:29:52.755Z",
    "size": 1235079,
    "path": "../public/assets/hosted/pexels-32870.jpg"
  },
  "/assets/art/abstract-1.jpg": {
    "type": "image/jpeg",
    "etag": '"2ac0-Jf44TzavyTkvgAtwTrRxElDbR9Q"',
    "mtime": "2026-05-05T19:35:54.552Z",
    "size": 10944,
    "path": "../public/assets/art/abstract-1.jpg"
  },
  "/assets/hosted/pexels-614810.jpeg": {
    "type": "image/jpeg",
    "etag": '"140075-VQYOX+AsbP8bnLJsFbSA9sEY/3Q"',
    "mtime": "2026-11-16T19:29:53.180Z",
    "size": 1310837,
    "path": "../public/assets/hosted/pexels-614810.jpeg"
  },
  "/assets/jewelry/diamond-ring-1.jpg": {
    "type": "image/jpeg",
    "etag": '"2a3b-gboTWg7JYgXhpIPbJn4Kfsc/fHA"',
    "mtime": "2025-05-11T09:26:21.000Z",
    "size": 10811,
    "path": "../public/assets/jewelry/diamond-ring-1.jpg"
  },
  "/assets/hosted/unsplash-1438761681033-6461ffad8d80.jpg": {
    "type": "image/jpeg",
    "etag": '"131b4e-kIBiy2xM79Ac692vRBBeMc3YFw8"',
    "mtime": "2026-11-16T19:29:53.647Z",
    "size": 1252174,
    "path": "../public/assets/hosted/unsplash-1438761681033-6461ffad8d80.jpg"
  },
  "/assets/real-estate/villa-1.jpg.svg": {
    "type": "image/svg+xml",
    "etag": '"2aa-0n3Vv3Qxmq0fFybG17lidMdYHVE"',
    "mtime": "2026-05-05T19:35:54.563Z",
    "size": 682,
    "path": "../public/assets/real-estate/villa-1.jpg.svg"
  },
  "/assets/hosted/pexels-1222271.jpeg": {
    "type": "image/jpeg",
    "etag": '"18c9af-MhHxdBL16lJ8jW72Q2DsLoNVd3I"',
    "mtime": "2026-11-16T19:29:53.309Z",
    "size": 1624495,
    "path": "../public/assets/hosted/pexels-1222271.jpeg"
  },
  "/assets/hosted/pexels-1396122.jpeg": {
    "type": "image/jpeg",
    "etag": '"1ef704-Gd3JO+231pDYKuMFz4kApjY3zYQ"',
    "mtime": "2026-11-16T19:29:53.121Z",
    "size": 2029316,
    "path": "../public/assets/hosted/pexels-1396122.jpeg"
  },
  "/assets/jewelry/tiara-1.jpg": {
    "type": "image/jpeg",
    "etag": '"2f67e-EaH2I5jZ3besYGPQh4oFeyReUtU"',
    "mtime": "2025-05-11T09:26:21.000Z",
    "size": 194174,
    "path": "../public/assets/jewelry/tiara-1.jpg"
  },
  "/assets/hosted/pexels-774909.jpeg": {
    "type": "image/jpeg",
    "etag": '"18d0bb-HJiiby9USSwReDTh0xY58oTrj54"',
    "mtime": "2026-11-16T19:29:53.275Z",
    "size": 1626299,
    "path": "../public/assets/hosted/pexels-774909.jpeg"
  },
  "/assets/hosted/pexels-91227.jpeg": {
    "type": "image/jpeg",
    "etag": '"1a459c-XSaLXDvT8p11hi1GeniIcVGYOm8"',
    "mtime": "2026-11-16T19:29:53.348Z",
    "size": 1721756,
    "path": "../public/assets/hosted/pexels-91227.jpeg"
  },
  "/assets/watches/rolex-daytona.jpg": {
    "type": "image/jpeg",
    "etag": '"33744-z9+I+Ad6mm1CdnWGPU/EY43qOjQ"',
    "mtime": "2025-05-11T09:26:21.000Z",
    "size": 210756,
    "path": "../public/assets/watches/rolex-daytona.jpg"
  },
  "/assets/real-estate/penthouse-1.jpg.svg": {
    "type": "image/svg+xml",
    "etag": '"10b-CaNNs9oR6ayanbKRH2nUMxcBRMQ"',
    "mtime": "2026-05-05T19:35:54.562Z",
    "size": 267,
    "path": "../public/assets/real-estate/penthouse-1.jpg.svg"
  },
  "/assets/real-estate/vineyard-1.jpg.svg": {
    "type": "image/svg+xml",
    "etag": '"10a-m8p0wmj/we+05LVi0R6KIXnnGg4"',
    "mtime": "2026-05-05T19:35:54.563Z",
    "size": 266,
    "path": "../public/assets/real-estate/vineyard-1.jpg.svg"
  },
  "/assets/hosted/pexels-20967.jpg": {
    "type": "image/jpeg",
    "etag": '"204f21-vpnPpzfb5g8AnnsS+ryTPfFw0q4"',
    "mtime": "2026-11-16T19:29:54.254Z",
    "size": 2117409,
    "path": "../public/assets/hosted/pexels-20967.jpg"
  },
  "/assets/hosted/unsplash-1494790108377-be9c29b29330.jpg": {
    "type": "image/jpeg",
    "etag": '"1a3203-5P0eN6qtSxQg8Lrk6rw2GR9e7eI"',
    "mtime": "2026-11-16T19:29:53.912Z",
    "size": 1716739,
    "path": "../public/assets/hosted/unsplash-1494790108377-be9c29b29330.jpg"
  },
  "/assets/hosted/unsplash-1472099645785-5658abf4ff4e.jpg": {
    "type": "image/jpeg",
    "etag": '"20aae5-QWeUt/RPku1OlLPG9AHpwpQ3Guw"',
    "mtime": "2026-11-16T19:29:53.578Z",
    "size": 2140901,
    "path": "../public/assets/hosted/unsplash-1472099645785-5658abf4ff4e.jpg"
  },
  "/assets/hosted/pexels-1585325.jpeg": {
    "type": "image/jpeg",
    "etag": '"2f7805-tnVpTjLCnkAsqa9571UYA8EOdrg"',
    "mtime": "2026-11-16T19:29:53.045Z",
    "size": 3110917,
    "path": "../public/assets/hosted/pexels-1585325.jpeg"
  },
  "/assets/hosted/pexels-220453.jpeg": {
    "type": "image/jpeg",
    "etag": '"28d8b1-0WpEEz19NeirVOsaJmaYQYUMpbw"',
    "mtime": "2026-11-16T19:29:53.232Z",
    "size": 2676913,
    "path": "../public/assets/hosted/pexels-220453.jpeg"
  },
  "/assets/jewelry/sapphire-necklace.jpg": {
    "type": "image/jpeg",
    "etag": '"f524c-6OYD3YNKjX2PSp9dNN6vk+mrGE4"',
    "mtime": "2025-05-11T09:26:21.000Z",
    "size": 1004108,
    "path": "../public/assets/jewelry/sapphire-necklace.jpg"
  },
  "/assets/hosted/unsplash-1507003211169-0a1dd7228f2d.jpg": {
    "type": "image/jpeg",
    "etag": '"23f4be-LsJGvkbYbF1y4ifkFrjeNfRfzYM"',
    "mtime": "2026-11-16T19:29:54.021Z",
    "size": 2356414,
    "path": "../public/assets/hosted/unsplash-1507003211169-0a1dd7228f2d.jpg"
  },
  "/assets/hosted/pexels-1239291.jpeg": {
    "type": "image/jpeg",
    "etag": '"362810-NFeEgHU7xHGZ+JwnAh/PUpvvO0I"',
    "mtime": "2026-11-16T19:29:53.407Z",
    "size": 3549200,
    "path": "../public/assets/hosted/pexels-1239291.jpeg"
  },
  "/assets/hosted/unsplash-1487412720507-e7ab37603c6f.jpg": {
    "type": "image/jpeg",
    "etag": '"2b839f-1qOlVnV2OGWz5QUAwfV5EkSHxNc"',
    "mtime": "2026-11-16T19:29:54.149Z",
    "size": 2851743,
    "path": "../public/assets/hosted/unsplash-1487412720507-e7ab37603c6f.jpg"
  },
  "/assets/hosted/unsplash-1500648767791-00dcc994a43e.jpg": {
    "type": "image/jpeg",
    "etag": '"402674-iABb6ejla3A5ZzE4zgxiPqBaYHI"',
    "mtime": "2026-11-16T19:29:53.813Z",
    "size": 4204148,
    "path": "../public/assets/hosted/unsplash-1500648767791-00dcc994a43e.jpg"
  },
  "/assets/hosted/pexels-442116.jpeg": {
    "type": "image/jpeg",
    "etag": '"51d971-h4WPiMK4kKEw6lourRI0eL9VB84"',
    "mtime": "2026-11-16T19:29:52.874Z",
    "size": 5364081,
    "path": "../public/assets/hosted/pexels-442116.jpeg"
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
const _lazy_8vgT7Y = defineLazyEventHandler(() => import("./_routes/health.mjs"));
const _lazy_Sxc_45 = defineLazyEventHandler(() => import("./_routes/records/assets.mjs"));
const _lazy_PI7eDW = defineLazyEventHandler(() => import("./_routes/records/assets2.mjs"));
const _lazy_ppJRZE = defineLazyEventHandler(() => import("./_id_.get.mjs"));
const _lazy_rwQOS9 = defineLazyEventHandler(() => import("./_id_.patch.mjs"));
const _lazy_Bsf3mC = defineLazyEventHandler(() => import("./_routes/records/users.mjs"));
const _lazy_6qdZ_x = defineLazyEventHandler(() => import("./_routes/records/users2.mjs"));
const _lazy_P3MNtM = defineLazyEventHandler(() => import("./_id_.get2.mjs"));
const _lazy_96AcaF = defineLazyEventHandler(() => import("./_id_.patch2.mjs"));
const _lazy_FWZWAD = defineLazyEventHandler(() => import("./_routes/sync.mjs"));
const _lazy_U8TL8_ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const $0 = { route: "/health", method: "get", handler: _lazy_8vgT7Y }, $1 = { route: "/records/assets", method: "get", handler: _lazy_Sxc_45 }, $2 = { route: "/records/assets", method: "post", handler: _lazy_PI7eDW }, $3 = { route: "/records/users", method: "get", handler: _lazy_Bsf3mC }, $4 = { route: "/records/users", method: "post", handler: _lazy_6qdZ_x }, $5 = { route: "/sync", method: "post", handler: _lazy_FWZWAD }, $6 = { route: "/records/assets/:id", method: "get", handler: _lazy_ppJRZE }, $7 = { route: "/records/assets/:id", method: "patch", handler: _lazy_rwQOS9 }, $8 = { route: "/records/users/:id", method: "get", handler: _lazy_P3MNtM }, $9 = { route: "/records/users/:id", method: "patch", handler: _lazy_96AcaF }, $10 = { route: "/**", handler: _lazy_U8TL8_ };
  return (m, p) => {
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    if (p === "/health") {
      if (m === "GET") return { data: $0 };
    } else if (p === "/records/assets") {
      if (m === "GET") return { data: $1 };
      if (m === "POST") return { data: $2 };
    } else if (p === "/records/users") {
      if (m === "GET") return { data: $3 };
      if (m === "POST") return { data: $4 };
    } else if (p === "/sync") {
      if (m === "POST") return { data: $5 };
    }
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "records") {
        if (l > 2) {
          if (s[2] === "assets") {
            if (l === 4 || l === 3) {
              if (m === "GET") {
                if (l > 3) return { data: $6, params: { "id": s[3] } };
              }
              if (m === "PATCH") {
                if (l > 3) return { data: $7, params: { "id": s[3] } };
              }
            }
          } else if (s[2] === "users") {
            if (l === 4 || l === 3) {
              if (m === "GET") {
                if (l > 3) return { data: $8, params: { "id": s[3] } };
              }
              if (m === "PATCH") {
                if (l > 3) return { data: $9, params: { "id": s[3] } };
              }
            }
          }
        }
      }
    }
    return { data: $10, params: { "_": s.slice(1).join("/") } };
  };
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
