import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { handleGetKey } from '../catalog-api.mjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  const result = await handleGetKey(body || {});
  setResponseStatus(event, result.status);
  if (result.emptyBody) return '';
  return result.body;
});