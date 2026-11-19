import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3';
import { handleCatalog } from '../../../catalog-api.mjs';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await handleCatalog('GET', `/records/assets/${id}`);
  setResponseStatus(event, result.status);
  return result.body;
});
