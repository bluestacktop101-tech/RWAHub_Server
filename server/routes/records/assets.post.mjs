import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { handleCatalog } from '../../catalog-api.mjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  const result = await handleCatalog('POST', '/records/assets', body || {});
  setResponseStatus(event, result.status);
  return result.body;
});
