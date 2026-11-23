import { defineEventHandler, readBody } from 'h3';
import { handleGetKey } from '../catalog-api.mjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  const result = await handleGetKey(body || {});
  if (result.emptyBody) {
    event.node.res.statusCode = result.status;
    return null;
  }
  event.node.res.statusCode = result.status;
  return result.body;
});