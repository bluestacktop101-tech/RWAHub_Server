import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { FormEvent, useState } from "react";

type LogEntry = {
  name: string;
  label: string;
  lastSeen: string;
  text: string;
};

type LogResult =
  | { ok: true; logs: LogEntry[] }
  | { ok: false; error: string };

const loadServerLogs = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => data)
  .handler(async ({ data }): Promise<LogResult> => {
    const { adminPasswordMatches, listServerLogs } = await import("../../server/catalog-api.mjs");
    if (!process.env.ADMIN_PASSWORD) {
      return { ok: false, error: "Admin password is not configured on the server." };
    }
    if (!adminPasswordMatches(data.password)) {
      return { ok: false, error: "Wrong password." };
    }
    return { ok: true, logs: await listServerLogs() };
  });

export const Route = createFileRoute("/server-log")({
  component: ServerLogPage,
  head: () => ({
    meta: [{ title: "Server log — RWA Hub" }],
  }),
});

function LogDetail({ log }: { log?: LogEntry }) {
  if (!log) {
    return (
      <details className="rounded-md border">
        <summary className="cursor-pointer px-4 py-3 font-semibold">Detail</summary>
        <p className="px-4 pb-4 text-sm text-muted-foreground">Select a PC log.</p>
      </details>
    );
  }
  return (
    <details open className="rounded-md border">
      <summary className="cursor-pointer px-4 py-3 font-semibold">{log.label}</summary>
      {log.lastSeen ? <p className="px-4 text-sm text-muted-foreground">{log.lastSeen}</p> : null}
      <pre className="m-3 overflow-auto whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">{log.text}</pre>
    </details>
  );
}

function ServerLogPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logs, setLogs] = useState<LogEntry[] | null>(null);
  const [selectedName, setSelectedName] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await loadServerLogs({ data: { password } });
      if (!result.ok) {
        setLogs(null);
        setError(result.error);
        return;
      }
      setLogs(result.logs);
      setSelectedName(result.logs[0]?.name || "");
    } catch {
      setError("Could not open the server log.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Server log</h1>
        <p className="mt-2 text-sm text-muted-foreground">Admin password required.</p>
        <form onSubmit={onSubmit} className="mt-8 grid max-w-sm gap-3">
          <label htmlFor="password" className="text-sm font-medium">
            Admin password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2"
            required
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {pending ? "Checking..." : "Open log"}
          </button>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </form>
        {logs ? (
          <div className="mt-10 grid min-h-[24rem] grid-cols-1 border-t md:grid-cols-[220px_minmax(0,1fr)]">
            <nav className="border-b md:border-b-0 md:border-r">
              {logs.length === 0 ? <p className="p-4 text-sm text-muted-foreground">No logs yet.</p> : null}
              {logs.map((log) => (
                <button
                  key={log.name}
                  type="button"
                  onClick={() => setSelectedName(log.name)}
                  className={`block w-full px-4 py-3 text-left text-sm ${selectedName === log.name ? "bg-muted font-semibold" : ""}`}
                >
                  {log.label.replace(/\s*\([^)]*\)$/, "") || log.label}
                </button>
              ))}
            </nav>
            <section className="p-4">
              <LogDetail log={logs.find((log) => log.name === selectedName)} />
            </section>
          </div>
        ) : null}
      </div>
    </main>
  );
}
