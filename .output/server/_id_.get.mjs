import { c as defineEventHandler, g as getRouterParam, s as setResponseStatus } from "./_libs/h3.mjs";
import { h as handleCatalog } from "./_chunks/catalog-api.mjs";
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
import "node:url";
const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const result = await handleCatalog("GET", `/records/assets/${id}`);
  setResponseStatus(event, result.status);
  return result.body;
});
export {
  _id__get as default
};
