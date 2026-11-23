import { c as defineEventHandler, r as readBody, s as setResponseStatus } from "../../_libs/h3.mjs";
import { a as handleCatalog } from "../../_chunks/catalog-api.mjs";
import "../../_libs/rou3.mjs";
import "../../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "node:fs";
import "node:path";
import "node:crypto";
import "node:util";
import "node:url";
const assets_post = defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  const result = await handleCatalog("POST", "/records/assets", body || {});
  setResponseStatus(event, result.status);
  return result.body;
});
export {
  assets_post as default
};
