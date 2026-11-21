import { c as defineEventHandler } from "../../_libs/h3.mjs";
import { h as handleCatalog } from "../../_chunks/catalog-api.mjs";
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
import "node:url";
const assets_get = defineEventHandler(async () => (await handleCatalog("GET", "/records/assets")).body);
export {
  assets_get as default
};
