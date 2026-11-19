import { defineEventHandler } from 'h3';
import { handleCatalog } from '../catalog-api.mjs';

export default defineEventHandler(async () => {
  return (await handleCatalog('GET', '/health')).body;
});
