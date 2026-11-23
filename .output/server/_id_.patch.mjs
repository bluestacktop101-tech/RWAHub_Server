import { c as defineEventHandler, g as getRouterParam, r as readBody, s as setResponseStatus } from "./_libs/h3.mjs";
import { a as handleCatalog } from "./_chunks/catalog-api.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
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
const _id__patch = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event).catch(() => ({}));
  const result = await handleCatalog("PATCH", `/records/assets/${id}`, body || {});
  setResponseStatus(event, result.status);
  return result.body;
});
export {
  _id__patch as default
};
