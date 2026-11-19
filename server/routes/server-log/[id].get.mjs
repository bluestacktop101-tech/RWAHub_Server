import { defineEventHandler, getHeader, getRouterParam, setHeader, setResponseHeader, setResponseStatus } from 'h3';
import { handleCatalog } from '../../catalog-api.mjs';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const result = await handleCatalog('GET', `/server-log/${id}`, {}, { cookie: getHeader(event, 'cookie') || '' });
  setResponseStatus(event, result.status);
  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) setHeader(event, key, value);
  }
  setResponseHeader(event, 'content-type', result.contentType);
  return result.body;
});
