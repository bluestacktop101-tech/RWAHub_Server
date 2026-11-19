import { defineEventHandler, getHeader, readBody, setHeader, setResponseHeader, setResponseStatus } from 'h3';
import { handleCatalog } from '../../catalog-api.mjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  const result = await handleCatalog('POST', '/server-log/login', body || {}, { cookie: getHeader(event, 'cookie') || '' });
  setResponseStatus(event, result.status);
  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) setHeader(event, key, value);
  }
  setResponseHeader(event, 'content-type', result.contentType || 'text/html; charset=utf-8');
  return result.body;
});
