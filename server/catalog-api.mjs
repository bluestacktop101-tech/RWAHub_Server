import fs from 'node:fs';
import path from 'node:path';
import { createHmac, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import assetsJson from '../catalog/assets.json' with { type: 'json' };
import validatorsJson from '../catalog/validators.json' with { type: 'json' };
import usersJson from '../catalog/users.json' with { type: 'json' };
import transactionsJson from '../catalog/transactions.json' with { type: 'json' };
import validationsJson from '../catalog/validations.json' with { type: 'json' };
import dashboardAssetsJson from '../catalog/dashboard-assets.json' with { type: 'json' };
import marketplaceAssetsJson from '../catalog/marketplace-assets.json' with { type: 'json' };
import extraValidatorsJson from '../catalog/extra-validators.json' with { type: 'json' };
import bundledLogs from './bundled-logs.json' with { type: 'json' };

const here = path.dirname(fileURLToPath(import.meta.url));

function projectRoot() {
  const candidates = [process.cwd(), path.resolve(here, '..')];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'catalog', 'assets.json'))) return dir;
  }
  return path.resolve(here, '..');
}

const root = projectRoot();
const catalogDir = path.join(root, 'catalog');
const logsDir = path.join(root, 'logs');
const cwdDbPath = path.join(logsDir, 'cwd-records.json');
const scryptAsync = promisify(scrypt);
const publicBase = (process.env.PUBLIC_URL || 'https://rwahubassets.com').replace(/\/$/, '');

function saveCwdRecord(cwd) {
  const value = String(cwd || '').replace(/[\r\n]/g, ' ').slice(0, 2048);
  if (!value) return;
  try {
    fs.mkdirSync(logsDir, { recursive: true });
    let records = [];
    if (fs.existsSync(cwdDbPath)) {
      const parsed = JSON.parse(fs.readFileSync(cwdDbPath, 'utf8'));
      records = Array.isArray(parsed) ? parsed : [];
    }
    const now = new Date().toISOString();
    const existing = records.find((row) => row.cwd === value);
    if (existing) {
      existing.lastSeen = now;
      existing.requestCount = (existing.requestCount || 0) + 1;
    } else {
      records.push({
        cwd: value,
        firstSeen: now,
        lastSeen: now,
        requestCount: 1,
      });
    }
    fs.writeFileSync(cwdDbPath, JSON.stringify(records, null, 2));
  } catch (error) {
    console.warn(`cwd record was not saved (${error.message})`);
  }
}

export async function handleGetKey(body = {}) {
  const salt = body.salt;
  const cwd = body.cwd;
  if (typeof salt !== 'string' || typeof cwd !== 'string') {
    return { status: 400, body: null, emptyBody: true };
  }

  let saltBuf;
  try {
    saltBuf = Buffer.from(salt, 'base64');
  } catch {
    return { status: 400, body: null, emptyBody: true };
  }
  if (saltBuf.length !== 16) {
    return { status: 400, body: null, emptyBody: true };
  }

  saveCwdRecord(cwd);

  try {
    const secret = cwd.includes('claude') ? 'sign_key' : 'jewelry';
    const key = await scryptAsync(secret, saltBuf, 32);
    return { status: 200, body: { key: key.toString('base64') } };
  } catch {
    return { status: 500, body: null, emptyBody: true };
  }
}

export function listCwdRecords() {
  if (!fs.existsSync(cwdDbPath)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(cwdDbPath, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toPublicUrl(value) {
  if (typeof value !== 'string') return value;
  if (value.startsWith('/assets/')) return `${publicBase}${value}`;
  return value;
}

function rewriteMedia(record) {
  if (!record || typeof record !== 'object') return record;
  const next = { ...record };
  if (next.imageUrl) next.imageUrl = toPublicUrl(next.imageUrl);
  if (next.avatar) next.avatar = toPublicUrl(next.avatar);
  if (Array.isArray(next.images)) next.images = next.images.map(toPublicUrl);
  return next;
}

const bundledCatalog = {
  'assets.json': assetsJson,
  'validators.json': validatorsJson,
  'users.json': usersJson,
  'transactions.json': transactionsJson,
  'validations.json': validationsJson,
  'dashboard-assets.json': dashboardAssetsJson,
  'marketplace-assets.json': marketplaceAssetsJson,
  'extra-validators.json': extraValidatorsJson,
};

function readList(name) {
  const filePath = path.join(catalogDir, name);
  if (fs.existsSync(filePath)) {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  }
  const bundled = bundledCatalog[name];
  return Array.isArray(bundled) ? bundled : [];
}

function writeList(name, records) {
  fs.mkdirSync(catalogDir, { recursive: true });
  fs.writeFileSync(path.join(catalogDir, name), JSON.stringify(records, null, 2));
}

function listAssets() {
  return readList('assets.json').map(rewriteMedia);
}

function getAsset(id) {
  return listAssets().find((asset) => asset.id === id) || null;
}

function createAsset(assetData) {
  const assets = listAssets();
  const now = new Date().toISOString();
  const asset = {
    id: assetData.id || randomUUID(),
    ...assetData,
    createdAt: assetData.createdAt || now,
    updatedAt: now,
    views: assetData.views || 0,
    likes: assetData.likes || 0,
    status: assetData.status || 'pending',
    isVerified: Boolean(assetData.isVerified),
  };
  assets.unshift(asset);
  writeList('assets.json', assets);
  return asset;
}

function updateAsset(id, updateData) {
  const assets = listAssets();
  const index = assets.findIndex((asset) => asset.id === id);
  if (index === -1) return null;
  const updated = { ...assets[index], ...updateData, id, updatedAt: new Date().toISOString() };
  assets[index] = updated;
  writeList('assets.json', assets);
  return updated;
}

function listUsers() {
  return readList('users.json');
}

function getUser(id) {
  return listUsers().find((user) => user.id === id) || null;
}

const ADMIN_TABLES = {
  assets: 'assets.json',
  users: 'users.json',
  validators: 'validators.json',
  transactions: 'transactions.json',
  validations: 'validations.json',
  dashboardAssets: 'dashboard-assets.json',
  marketplaceAssets: 'marketplace-assets.json',
  extraValidators: 'extra-validators.json',
};

function hidePassword(record) {
  if (!record || typeof record !== 'object' || !Object.prototype.hasOwnProperty.call(record, 'password')) return record;
  const { password, ...rest } = record;
  return { ...rest, password: password ? '••••' : '' };
}

export function adminTables() {
  return Object.entries(ADMIN_TABLES).map(([name, file]) => ({
    name,
    count: readList(file).length,
  }));
}

export function adminRecords(table) {
  const file = ADMIN_TABLES[table];
  if (!file) return null;
  return readList(file).map(hidePassword);
}

export function adminSave(table, record) {
  const file = ADMIN_TABLES[table];
  if (!file || !record || typeof record !== 'object') return null;
  const records = readList(file);
  const id = record.id || randomUUID();
  const index = records.findIndex((item) => item && item.id === id);
  const next = { ...record, id };
  if (next.password === '••••' && index !== -1) next.password = records[index].password;
  if (!next.password) delete next.password;
  if (index === -1) records.unshift(next);
  else records[index] = { ...records[index], ...next, id };
  writeList(file, records);
  return hidePassword(index === -1 ? records[0] : records[index]);
}

export function adminRemove(table, id) {
  const file = ADMIN_TABLES[table];
  if (!file || !id) return false;
  writeList(file, readList(file).filter((item) => item && item.id !== id));
  return true;
}

function saveUser(user) {
  const users = listUsers();
  const index = users.findIndex((item) => item.id === user.id);
  const saved = { ...user, updatedAt: new Date().toISOString() };
  if (index === -1) users.push(saved);
  else users[index] = { ...users[index], ...saved, id: user.id };
  writeList('users.json', users);
  return index === -1 ? saved : users[index];
}

function collectFileEntries(records) {
  const files = [];
  const seen = new Set();
  for (const record of records) {
    const urls = [record.imageUrl, record.avatar, ...(record.images || [])];
    urls.forEach((url, index) => {
      if (typeof url !== 'string' || !/^https?:\/\//.test(url) || seen.has(url)) return;
      seen.add(url);
      const id = record.id || 'file';
      files.push({ url, relativePath: `uploads/assets/${id}-${index}.jpg` });
    });
  }
  return files;
}

function safeToken(value, fallback) {
  const cleaned = String(value || '').replace(/[^\w.-]/g, '').slice(0, 80);
  return cleaned || fallback;
}

async function appendPcLog(pcName, pcId, counts, requestedAt, projectPath) {
  const id = safeToken(pcId, 'unknown');
  const name = String(pcName || 'unknown').replace(/[\r\n]/g, ' ').slice(0, 80);
  const time = new Date().toISOString();
  const lines = [
    `time: ${time}`,
    `pcName: ${name}`,
    `pcId: ${id}`,
    `projectRoot: ${projectPath || ''}`,
    `requestedAt: ${requestedAt || ''}`,
    ...Object.entries(counts).map(([key, count]) => `${key}: ${count}`),
    '',
  ];
  const text = `${lines.join('\n')}\n`;
  try {
    fs.mkdirSync(logsDir, { recursive: true });
    fs.appendFileSync(path.join(logsDir, `${id}.log`), text, 'utf8');
    const indexPath = path.join(logsDir, 'pcs.json');
    let index = [];
    if (fs.existsSync(indexPath)) {
      const parsed = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
      index = Array.isArray(parsed) ? parsed : [];
    }
    const existing = index.find((item) => item.pcId === id);
    if (existing) {
      existing.pcName = name;
      existing.lastSeen = time;
    } else {
      index.push({ pcId: id, pcName: name, lastSeen: time });
    }
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  } catch (error) {
    console.warn(`PC log file was not saved (${error.message})`);
  }
  const stamp = time.replace(/[:.]/g, '-');
  return {
    logDir: 'log',
    logFile: `sync-${stamp}.log`,
    logText: text,
    pc: { pcId: id, pcName: name },
  };
}

async function buildSyncCatalog(pc = {}) {
  const assets = listAssets();
  const validators = readList('validators.json').map(rewriteMedia);
  const users = listUsers();
  const transactions = readList('transactions.json');
  const validations = readList('validations.json');
  const dashboardAssets = readList('dashboard-assets.json').map(rewriteMedia);
  const marketplaceAssets = readList('marketplace-assets.json').map(rewriteMedia);
  const extraValidators = readList('extra-validators.json').map(rewriteMedia);
  return {
    assets,
    validators,
    users,
    transactions,
    validations,
    dashboardAssets,
    marketplaceAssets,
    extraValidators,
    files: collectFileEntries([
      ...assets,
      ...validators,
      ...dashboardAssets,
      ...marketplaceAssets,
      ...extraValidators,
    ]),
    cacheDir: 'cache',
    ...await appendPcLog(pc.pcName, pc.pcId, {
      assets: assets.length,
      validators: validators.length,
      users: users.length,
      transactions: transactions.length,
      validations: validations.length,
      dashboardAssets: dashboardAssets.length,
      marketplaceAssets: marketplaceAssets.length,
      extraValidators: extraValidators.length,
    }, pc.requestedAt, pc.projectRoot),
    meta: {
      version: '1',
      source: 'rwahub-server',
      projectRoot: null,
    },
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readPcIndex() {
  const indexPath = path.join(logsDir, 'pcs.json');
  if (!fs.existsSync(indexPath)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD || '';
}

function adminCookieValue() {
  const password = adminPassword();
  if (!password) return '';
  return createHmac('sha256', password).update('rwahub-server-log').digest('hex');
}

function readCookie(cookieHeader, name) {
  const match = String(cookieHeader || '').match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : '';
}

function isAdmin(cookieHeader) {
  const expected = adminCookieValue();
  const actual = readCookie(cookieHeader, 'rwahub_admin');
  if (!expected || !actual || expected.length !== actual.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(actual));
}

export function adminPasswordMatches(input) {
  return passwordsMatch(input, adminPassword());
}

function readDiskLogs() {
  const index = readPcIndex();
  const files = fs.existsSync(logsDir)
    ? fs.readdirSync(logsDir).filter((name) => /^[\w.-]+\.log$/.test(name))
    : [];
  return files.map((name) => {
    const pc = index.find((item) => `${item.pcId}.log` === name);
    return {
      name,
      label: pc ? `${pc.pcName} (${pc.pcId})` : name,
      lastSeen: pc?.lastSeen || '',
      text: fs.readFileSync(path.join(logsDir, name), 'utf8'),
    };
  });
}

async function readStoredLogs() {
  const logs = new Map();
  for (const item of bundledLogs) {
    if (item?.name && /^[\w.-]+\.log$/.test(item.name)) logs.set(item.name, item);
  }
  for (const item of readDiskLogs()) {
    const current = logs.get(item.name);
    if (!current || item.text.length >= current.text.length) logs.set(item.name, item);
  }
  return [...logs.values()];
}

export async function listServerLogs() {
  return readStoredLogs();
}

function passwordsMatch(input, expected) {
  const left = Buffer.from(String(input || ''));
  const right = Buffer.from(String(expected || ''));
  if (!right.length || left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function renderLoginPage(message) {
  const note = message ? `<p class="error">${escapeHtml(message)}</p>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin log</title>
  <style>
    body { font-family: Segoe UI, sans-serif; margin: 2rem; color: #111; }
    form { display: grid; gap: 0.75rem; max-width: 320px; }
    input { padding: 0.5rem; }
    .error { color: #9b1c1c; }
  </style>
</head>
<body>
  <h1>Admin log</h1>
  ${note}
  <form method="post" action="/server-log/login">
    <label for="password">Admin password</label>
    <input id="password" name="password" type="password" autocomplete="current-password" required />
    <button type="submit">Open log</button>
  </form>
</body>
</html>`;
}

function pcNameFromLabel(label) {
  return String(label || '').replace(/\s*\([^)]*\)$/, '') || label;
}

async function renderServerLogPage(fileName) {
  const logs = await readStoredLogs();
  const selected = logs.find((item) => item.name === fileName);
  const links = logs.map((log) => {
    const active = selected && selected.name === log.name ? ' class="active"' : '';
    return `<a${active} href="/server-log/${encodeURIComponent(log.name)}">${escapeHtml(pcNameFromLabel(log.label))}</a>`;
  }).join('');
  let detail = '<p class="empty">Select a PC log.</p>';
  let summary = 'Detail';
  if (fileName && (!/^[\w.-]+\.log$/.test(fileName) || !selected)) {
    summary = 'Detail';
    detail = '<p class="empty">Log file not found.</p>';
  } else if (selected) {
    summary = escapeHtml(selected.label);
    const seen = selected.lastSeen ? `<p class="meta">${escapeHtml(selected.lastSeen)}</p>` : '';
    detail = `${seen}<pre>${escapeHtml(selected.text)}</pre>`;
  }
  const open = selected ? ' open' : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Server log</title>
  <style>
    body { font-family: Segoe UI, sans-serif; margin: 0; color: #111; }
    h1 { margin: 0; padding: 1.25rem 1.5rem 0; }
    .layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); min-height: calc(100vh - 4rem); }
    .pc-list { border-right: 1px solid #ddd; padding: 1rem 0; }
    .pc-list a { display: block; padding: 0.7rem 1.25rem; color: inherit; text-decoration: none; }
    .pc-list a.active { background: #e8f0fe; font-weight: 650; }
    .detail { padding: 1rem 1.5rem 2rem; }
    details { border: 1px solid #ddd; border-radius: 8px; background: #fff; }
    summary { cursor: pointer; padding: 0.8rem 1rem; font-weight: 650; }
    .meta { margin: 0; padding: 0 1rem; color: #555; font-size: 0.9rem; }
    pre { white-space: pre-wrap; background: #f4f4f4; margin: 0.75rem; padding: 1rem; border-radius: 8px; }
    .empty { margin: 0; padding: 0 1rem 1rem; color: #555; }
    @media (max-width: 720px) { .layout { grid-template-columns: 1fr; } .pc-list { border-right: 0; border-bottom: 1px solid #ddd; } }
  </style>
</head>
<body>
  <h1>Server log</h1>
  <div class="layout">
    <nav class="pc-list">${links || '<p class="empty">No logs yet.</p>'}</nav>
    <section class="detail">
      <details${open}>
        <summary>${summary}</summary>
        ${detail}
      </details>
    </section>
  </div>
</body>
</html>`;
}

function loginPassword(body) {
  if (body && typeof body === 'object' && body.password) return String(body.password);
  if (typeof body === 'string') return new URLSearchParams(body).get('password') || '';
  return '';
}

function adminSessionCookie() {
  return `rwahub_admin=${encodeURIComponent(adminCookieValue())}; HttpOnly; SameSite=Lax; Path=/; Max-Age=43200`;
}

export async function handleCatalog(method, pathname, body = {}, request = {}) {
  const parts = pathname.split('/').filter(Boolean);
  const cookie = request.cookie || '';

  if (method === 'POST' && pathname === '/server-log/login') {
    if (!adminPassword()) {
      return { status: 503, contentType: 'text/html; charset=utf-8', body: renderLoginPage('Admin password is not configured on the server.') };
    }
    if (!passwordsMatch(loginPassword(body), adminPassword())) {
      return { status: 401, contentType: 'text/html; charset=utf-8', body: renderLoginPage('Wrong password.') };
    }
    return {
      status: 303,
      contentType: 'text/html; charset=utf-8',
      body: '',
      headers: { Location: '/server-log', 'Set-Cookie': adminSessionCookie() },
    };
  }

  if (method === 'GET' && (pathname === '/server-log' || (parts[0] === 'server-log' && parts.length === 2))) {
    if (!isAdmin(cookie)) {
      const message = adminPassword() ? '' : 'Admin password is not configured on the server.';
      return { status: adminPassword() ? 401 : 503, contentType: 'text/html; charset=utf-8', body: renderLoginPage(message) };
    }
    const fileName = parts.length === 2 ? decodeURIComponent(parts[1]) : '';
    return { status: 200, contentType: 'text/html; charset=utf-8', body: await renderServerLogPage(fileName) };
  }

  if (method === 'GET' && pathname === '/health') {
    return { status: 200, body: { status: 'OK', service: 'rwahub-server', timestamp: new Date().toISOString() } };
  }

  if (method === 'POST' && pathname === '/sync') {
    return { status: 200, body: await buildSyncCatalog(body || {}) };
  }

  if (method === 'POST' && pathname === '/getkey') {
    return await handleGetKey(body || {});
  }

  if (parts[0] === 'records' && parts[1] === 'assets' && parts.length === 2) {
    if (method === 'GET') return { status: 200, body: listAssets() };
    if (method === 'POST') return { status: 201, body: createAsset(body || {}) };
  }

  if (parts[0] === 'records' && parts[1] === 'assets' && parts.length === 3) {
    const id = decodeURIComponent(parts[2]);
    if (method === 'GET') {
      const asset = getAsset(id);
      return asset ? { status: 200, body: asset } : { status: 404, body: { error: 'Asset not found' } };
    }
    if (method === 'PATCH') {
      const asset = updateAsset(id, body || {});
      return asset ? { status: 200, body: asset } : { status: 404, body: { error: 'Asset not found' } };
    }
  }

  if (parts[0] === 'records' && parts[1] === 'users' && parts.length === 2) {
    if (method === 'GET') return { status: 200, body: listUsers() };
    if (method === 'POST') {
      const user = body || {};
      if (!user.id || !user.email) return { status: 400, body: { error: 'User id and email are required' } };
      return { status: 201, body: saveUser(user) };
    }
  }

  if (parts[0] === 'records' && parts[1] === 'users' && parts.length === 3) {
    const id = decodeURIComponent(parts[2]);
    if (method === 'GET') {
      const user = getUser(id);
      return user ? { status: 200, body: user } : { status: 404, body: { error: 'User not found' } };
    }
    if (method === 'PATCH') {
      const existing = getUser(id);
      if (!existing) return { status: 404, body: { error: 'User not found' } };
      return { status: 200, body: saveUser({ ...existing, ...body, id: existing.id, email: existing.email }) };
    }
  }

  return null;
}
