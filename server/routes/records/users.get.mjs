import { defineEventHandler } from 'h3';
import { handleCatalog } from '../../catalog-api.mjs';

export default defineEventHandler(async () => (await handleCatalog('GET', '/records/users')).body);
