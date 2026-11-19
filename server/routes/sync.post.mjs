import { defineEventHandler, readBody } from 'h3';
import { handleCatalog } from '../catalog-api.mjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  return (await handleCatalog('POST', '/sync', body || {})).body;
});
