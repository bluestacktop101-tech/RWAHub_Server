import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { FormEvent, useState } from "react";

type TableInfo = { name: string; count: number };
type Row = Record<string, unknown>;

type AdminResult =
  | { ok: true; tables?: TableInfo[]; records?: Row[]; saved?: Row }
  | { ok: false; error: string };

const CATALOG_TABLES = [
  "assets",
  "users",
  "validators",
  "transactions",
  "validations",
  "dashboardAssets",
  "marketplaceAssets",
  "extraValidators",
];

const adminDb = createServerFn({ method: "POST" })
  .validator((data: { password: string; action: string; table?: string; record?: Row; id?: string }) => data)
  .handler(async ({ data }): Promise<AdminResult> => {
    const api = await import("../../server/catalog-api.mjs");
    if (!process.env.ADMIN_PASSWORD) {
      return { ok: false, error: "Admin password is not configured on the server." };
    }
    if (!api.adminPasswordMatches(data.password)) {
      return { ok: false, error: "Wrong password." };
    }
    if (data.action === "tables") {
      const tables = api.adminTables();
      const applications = await applicationCount();
      return { ok: true, tables: [...tables, applications] };
    }
    if (data.table === "applications") {
      if (data.action === "list") return listApplications();
      if (data.action === "delete") return deleteApplication(data.id || "");
      return { ok: false, error: "Applications can be viewed or deleted." };
    }
    if (data.action === "list") {
      const records = api.adminRecords(data.table);
      if (!records) return { ok: false, error: "Unknown table." };
      return { ok: true, records };
    }
    if (data.action === "save") {
      const saved = api.adminSave(data.table, data.record);
      if (!saved) return { ok: false, error: "Could not save that record." };
      return { ok: true, saved };
    }
    if (data.action === "delete") {
      if (!api.adminRemove(data.table, data.id)) return { ok: false, error: "Could not delete that record." };
      return { ok: true };
    }
    return { ok: false, error: "Unknown action." };
  });

function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return { url: url.replace(/\/$/, ""), key };
}

async function applicationCount(): Promise<TableInfo> {
  const listed = await listApplications();
  return { name: "applications", count: listed.ok ? listed.records?.length || 0 : 0 };
}

async function listApplications(): Promise<AdminResult> {
  const { url, key } = supabaseConfig();
  if (!url || !key) {
    return { ok: false, error: "Set SUPABASE_SERVICE_ROLE_KEY on the server to read applications." };
  }
  const response = await fetch(`${url}/rest/v1/job_applications?select=*&order=created_at.desc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!response.ok) return { ok: false, error: "Could not read applications." };
  const records = await response.json();
  return { ok: true, records: Array.isArray(records) ? records : [] };
}

async function deleteApplication(id: string): Promise<AdminResult> {
  const { url, key } = supabaseConfig();
  if (!url || !key) return { ok: false, error: "Set SUPABASE_SERVICE_ROLE_KEY on the server to delete applications." };
  if (!id) return { ok: false, error: "Missing application id." };
  const response = await fetch(`${url}/rest/v1/job_applications?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!response.ok) return { ok: false, error: "Could not delete that application." };
  return { ok: true };
}

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — RWA Hub" }] }),
});

function rowLabel(row: Row) {
  const value = row.title || row.full_name || row.name || row.email || row.id;
  return String(value || "Record");
}

function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [table, setTable] = useState("assets");
  const [records, setRecords] = useState<Row[]>([]);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState("");
  const [pending, setPending] = useState(false);

  const call = async (action: string, extra: { table?: string; record?: Row; id?: string } = {}) => {
    setPending(true);
    setError("");
    try {
      const result = await adminDb({ data: { password, action, table, ...extra } });
      if (!result.ok) {
        setError(result.error);
        return null;
      }
      return result;
    } catch {
      setError("Could not reach the admin database.");
      return null;
    } finally {
      setPending(false);
    }
  };

  const openTable = async (next: string, currentPassword = password) => {
    setTable(next);
    setDraft("");
    setEditingId("");
    setPending(true);
    setError("");
    try {
      const result = await adminDb({ data: { password: currentPassword, action: "list", table: next } });
      if (!result.ok) {
        setRecords([]);
        setError(result.error);
        return;
      }
      setRecords(result.records || []);
    } catch {
      setError("Could not reach the admin database.");
    } finally {
      setPending(false);
    }
  };

  const onUnlock = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await adminDb({ data: { password, action: "tables" } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setTables(result.tables || []);
      setUnlocked(true);
      await openTable("assets", password);
    } catch {
      setError("Could not reach the admin database.");
    } finally {
      setPending(false);
    }
  };

  const refreshTables = async () => {
    const result = await call("tables");
    if (result?.tables) setTables(result.tables);
    await openTable(table);
  };

  const onSave = async () => {
    let record: Row;
    try {
      record = JSON.parse(draft);
    } catch {
      setError("Record must be valid JSON.");
      return;
    }
    const result = await call("save", { record });
    if (!result) return;
    setDraft("");
    setEditingId("");
    await refreshTables();
  };

  const onDelete = async (id: string) => {
    const result = await call("delete", { id });
    if (!result) return;
    if (editingId === id) {
      setDraft("");
      setEditingId("");
    }
    await refreshTables();
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-background px-6 py-16 text-foreground">
        <form onSubmit={onUnlock} className="mx-auto grid max-w-sm gap-3">
          <h1 className="text-3xl font-bold">Admin database</h1>
          <label htmlFor="password" className="text-sm font-medium">Admin password</label>
          <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-md border px-3 py-2" required />
          <button type="submit" disabled={pending} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {pending ? "Checking..." : "Open database"}
          </button>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="px-6 pt-6 text-2xl font-bold">Admin database</h1>
      <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="border-b md:border-b-0 md:border-r">
          {(tables.length ? tables : CATALOG_TABLES.map((name) => ({ name, count: 0 }))).map((item) => (
            <button key={item.name} type="button" onClick={() => openTable(item.name)} className={`block w-full px-4 py-3 text-left text-sm ${table === item.name ? "bg-muted font-semibold" : ""}`}>
              {item.name} <span className="text-muted-foreground">({item.count})</span>
            </button>
          ))}
        </nav>
        <section className="p-4">
          {error ? <p className="mb-3 text-sm text-destructive">{error}</p> : null}
          <div className="mb-4 flex gap-2">
            <button type="button" onClick={() => { setEditingId(""); setDraft("{\n  \n}"); }} className="rounded-md border px-3 py-1.5 text-sm">New record</button>
          </div>
          {draft ? (
            <div className="mb-4 grid gap-2">
              <textarea value={draft} onChange={(event) => setDraft(event.target.value)} className="min-h-48 rounded-md border p-3 font-mono text-sm" />
              {table !== "applications" ? <button type="button" onClick={onSave} disabled={pending} className="w-fit rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Save</button> : null}
            </div>
          ) : null}
          <ul className="divide-y rounded-md border">
            {records.length === 0 ? <li className="p-4 text-sm text-muted-foreground">No records.</li> : null}
            {records.map((row) => (
              <li key={String(row.id)} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="font-medium">{rowLabel(row)}</p>
                  <p className="text-xs text-muted-foreground">{String(row.id || "")}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="text-sm underline" onClick={() => { setEditingId(String(row.id || "")); setDraft(JSON.stringify(row, null, 2)); }}>Edit</button>
                  <button type="button" className="text-sm text-destructive underline" onClick={() => onDelete(String(row.id || ""))}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
