import { defineEventHandler, getHeader, setHeader, setResponseHeader, setResponseStatus } from 'h3';
import { handleCatalog } from '../catalog-api.mjs';

export default defineEventHandler(async (event) => {
  const result = await handleCatalog('GET', '/server-log', {}, { cookie: getHeader(event, 'cookie') || '' });
  setResponseStatus(event, result.status);
  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) setHeader(event, key, value);
  }
  setResponseHeader(event, 'content-type', result.contentType);
  return result.body;
});
