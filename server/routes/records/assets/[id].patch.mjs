import { defineEventHandler, getRouterParam, readBody, setResponseStatus } from 'h3';
import { handleCatalog } from '../../../catalog-api.mjs';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event).catch(() => ({}));
  const result = await handleCatalog('PATCH', `/records/assets/${id}`, body || {});
  setResponseStatus(event, result.status);
  return result.body;
});
