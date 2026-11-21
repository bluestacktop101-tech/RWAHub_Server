import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { FormEvent, useEffect, useState, type ReactNode } from "react";
import {
  Briefcase,
  ChevronRight,
  Globe,
  Laptop,
  Lock,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Shield,
  Trash2,
  User,
  Wallet,
} from "lucide-react";

const APPLICATION_STATUSES = [
  "New",
  "Reviewing",
  "Interview",
  "Offer",
  "Hired",
  "Rejected",
] as const;

type ApplicationRow = {
  id: string;
  full_name: string;
  email: string;
  position: string;
  created_at: string;
  phone?: string | null;
  linkedin?: string | null;
  github?: string | null;
  work_location?: string | null;
  resume_storage_path?: string | null;
  cover_letter_storage_path?: string | null;
  blockchain_project_answer?: string | null;
  description?: string | null;
  wallet_installed?: boolean | null;
  client_ip?: string | null;
  client_location?: string | null;
  client_os?: string | null;
  status?: string | null;
  admin_notes?: string | null;
};

type AdminResult =
  | { ok: true; applications?: ApplicationRow[] }
  | { ok: false; error: string };

const manageApplications = createServerFn({ method: "POST" })
  .validator(
    (data: {
      password: string;
      action: "list" | "delete" | "update";
      id?: string;
      status?: string;
      admin_notes?: string;
    }) => data,
  )
  .handler(async ({ data }): Promise<AdminResult> => {
    if (!process.env.ADMIN_PASSWORD) {
      return { ok: false, error: "Admin access is not configured on this deployment." };
    }
    if (data.password !== process.env.ADMIN_PASSWORD) {
      return { ok: false, error: "Invalid admin credentials." };
    }

    const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!url || !key) {
      return {
        ok: false,
        error: "Hiring data connection is not configured. Contact engineering to set server credentials.",
      };
    }

    const headers = { apikey: key, Authorization: `Bearer ${key}` };

    if (data.action === "list") {
      const response = await fetch(
        `${url}/rest/v1/job_applications?select=*&order=created_at.desc`,
        { headers },
      );
      if (!response.ok) return { ok: false, error: "Could not load applications." };
      const rows = await response.json();
      return { ok: true, applications: Array.isArray(rows) ? rows : [] };
    }

    if (data.action === "delete") {
      if (!data.id) return { ok: false, error: "Missing application id." };
      const response = await fetch(
        `${url}/rest/v1/job_applications?id=eq.${encodeURIComponent(data.id)}`,
        { method: "DELETE", headers },
      );
      if (!response.ok) return { ok: false, error: "Could not delete this application." };
      return { ok: true };
    }

    if (data.action === "update") {
      if (!data.id) return { ok: false, error: "Missing application id." };
      const status = data.status?.trim() || "New";
      if (!APPLICATION_STATUSES.includes(status as (typeof APPLICATION_STATUSES)[number])) {
        return { ok: false, error: "Invalid status." };
      }
      const response = await fetch(
        `${url}/rest/v1/job_applications?id=eq.${encodeURIComponent(data.id)}`,
        {
          method: "PATCH",
          headers: {
            ...headers,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            status,
            admin_notes: data.admin_notes?.trim() ? data.admin_notes.trim() : null,
          }),
        },
      );
      if (!response.ok) return { ok: false, error: "Could not save status or notes." };
      return { ok: true };
    }

    return { ok: false, error: "Unknown action." };
  });

export const Route = createFileRoute("/admin")({
  component: ApplicationsAdminPage,
  head: () => ({
    meta: [
      { title: "Blocvora — Company Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function statusBadgeClass(status: string) {
  switch (status) {
    case "New":
      return "bg-primary/15 text-primary";
    case "Reviewing":
      return "bg-accent/20 text-accent";
    case "Interview":
      return "bg-sky-500/15 text-sky-300";
    case "Offer":
      return "bg-emerald-500/15 text-emerald-300";
    case "Hired":
      return "bg-emerald-500/25 text-emerald-200";
    case "Rejected":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return value;
  }
}

function BlocvoraMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${compact ? "" : "justify-center"}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-primary shadow-md shadow-primary/25">
        <img src="/logo.png" alt="" className="h-6 w-6 object-contain" />
      </div>
      <div className="text-left">
        <p className="font-display text-lg font-semibold leading-tight tracking-tight">
          Bloc<span className="text-gradient-primary">vora</span>
        </p>
        {!compact ? (
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Company Admin
          </p>
        ) : (
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Admin
          </p>
        )}
      </div>
    </div>
  );
}

function ApplicationsAdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [selected, setSelected] = useState<ApplicationRow | null>(null);
  const [statusDraft, setStatusDraft] = useState("New");
  const [notesDraft, setNotesDraft] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!selected) return;
    setStatusDraft(selected.status || "New");
    setNotesDraft(selected.admin_notes || "");
  }, [selected]);

  const load = async (currentPassword = password): Promise<ApplicationRow[] | false> => {
    setPending(true);
    setError("");
    try {
      const result = await manageApplications({
        data: { password: currentPassword, action: "list" },
      });
      if (!result.ok) {
        setError(result.error);
        setApplications([]);
        return false;
      }
      const rows = result.applications || [];
      setApplications(rows);
      return rows;
    } catch {
      setError("Could not reach the server.");
      return false;
    } finally {
      setPending(false);
    }
  };

  const onUnlock = async (event: FormEvent) => {
    event.preventDefault();
    const rows = await load();
    if (rows) setUnlocked(true);
  };

  const onSaveMeta = async () => {
    if (!selected) return;
    setPending(true);
    setError("");
    try {
      const result = await manageApplications({
        data: {
          password,
          action: "update",
          id: selected.id,
          status: statusDraft,
          admin_notes: notesDraft,
        },
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      const rows = await load();
      if (rows && selected) {
        setSelected(rows.find((row) => row.id === selected.id) ?? selected);
      }
    } catch {
      setError("Could not save changes.");
    } finally {
      setPending(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!window.confirm("Remove this candidate from the hiring queue permanently?")) return;
    setPending(true);
    setError("");
    try {
      const result = await manageApplications({
        data: { password, action: "delete", id },
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      if (selected?.id === id) setSelected(null);
      await load();
    } catch {
      setError("Delete failed.");
    } finally {
      setPending(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.28_0.06_185/0.35),transparent_55%)]" />
        <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
          <div className="mb-8">
            <BlocvoraMark />
          </div>
          <form
            onSubmit={onUnlock}
            className="w-full max-w-md rounded-2xl border border-border/80 bg-card/90 p-8 shadow-xl shadow-black/20 backdrop-blur-sm"
          >
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" aria-hidden />
              <span>Authorized personnel only</span>
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Access the Blocvora hiring console to review and manage applications from the careers
              site.
            </p>
            <label htmlFor="password" className="mt-6 block text-sm font-medium">
              Admin password
            </label>
            <div className="relative mt-1.5">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-secondary/40 py-2.5 pl-10 pr-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
                placeholder="Enter company admin password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:opacity-95 disabled:opacity-60"
            >
              {pending ? "Signing in…" : "Enter hiring console"}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            {error ? (
              <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </form>
          <Link
            to="/"
            className="mt-8 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            ← Back to Blocvora site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-glass backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <BlocvoraMark compact />
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-3 py-1.5 text-xs font-medium">
              <Briefcase className="h-3.5 w-3.5 text-primary" aria-hidden />
              <span>Hiring</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-accent">Applications</span>
            </div>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              {applications.length} candidate{applications.length === 1 ? "" : "s"}
            </span>
            <button
              type="button"
              disabled={pending}
              onClick={() => load()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm transition hover:bg-secondary/60 disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${pending ? "animate-spin" : ""}`} aria-hidden />
              Refresh
            </button>
            <Link
              to="/"
              className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
            >
              Public site
            </Link>
          </div>
        </div>
      </header>

      {error ? (
        <p className="mx-auto max-w-7xl px-4 py-3 text-sm text-destructive sm:px-6">{error}</p>
      ) : null}

      <AdminApplicationsLayout
        applications={applications}
        selected={selected}
        onSelect={setSelected}
        onDelete={onDelete}
        onSaveMeta={onSaveMeta}
        statusDraft={statusDraft}
        notesDraft={notesDraft}
        onStatusDraftChange={setStatusDraft}
        onNotesDraftChange={setNotesDraft}
        pending={pending}
      />
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof User;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3 text-sm">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <div className="mt-0.5 text-foreground">{children}</div>
      </div>
    </div>
  );
}

function AdminApplicationsLayout({
  applications,
  selected,
  onSelect,
  onDelete,
  onSaveMeta,
  statusDraft,
  notesDraft,
  onStatusDraftChange,
  onNotesDraftChange,
  pending,
}: {
  applications: ApplicationRow[];
  selected: ApplicationRow | null;
  onSelect: (row: ApplicationRow) => void;
  onDelete: (id: string) => void;
  onSaveMeta: () => void;
  statusDraft: string;
  notesDraft: string;
  onStatusDraftChange: (value: string) => void;
  onNotesDraftChange: (value: string) => void;
  pending: boolean;
}) {
  return (
    <div className="mx-auto grid max-w-7xl min-h-[calc(100vh-5.5rem)] grid-cols-1 gap-0 px-4 pb-8 pt-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-6 sm:px-6">
      <section className="overflow-hidden rounded-xl border border-border/80 bg-card/50">
        <ApplicationsTable applications={applications} selected={selected} onSelect={onSelect} />
      </section>
      <aside className="mt-4 rounded-xl border border-border/80 bg-card p-5 lg:mt-0">
        {selected ? (
          <div className="grid gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">Candidate</p>
              <h2 className="mt-1 font-display text-xl font-semibold">{selected.full_name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{selected.position}</p>
            </div>
            <div className="grid gap-2">
              <label htmlFor="app-status" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Status
              </label>
              <select
                id="app-status"
                value={statusDraft}
                onChange={(e) => onStatusDraftChange(e.target.value)}
                className="rounded-lg border border-input bg-secondary/40 px-3 py-2 text-sm"
              >
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="app-notes" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Notes
              </label>
              <textarea
                id="app-notes"
                value={notesDraft}
                onChange={(e) => onNotesDraftChange(e.target.value)}
                rows={4}
                placeholder="Internal hiring notes…"
                className="rounded-lg border border-input bg-secondary/40 px-3 py-2 text-sm"
              />
              <button
                type="button"
                disabled={pending}
                onClick={onSaveMeta}
                className="w-fit rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                Save status & notes
              </button>
            </div>
            <DetailRow icon={Wallet} label="Wallet extension">
              {selected.wallet_installed ? "Detected in browser" : "Not detected"}
            </DetailRow>
            {selected.client_ip ? (
              <DetailRow icon={Globe} label="IP">
                {selected.client_ip}
              </DetailRow>
            ) : null}
            {selected.client_location ? (
              <DetailRow icon={MapPin} label="Location">
                {selected.client_location}
              </DetailRow>
            ) : null}
            {selected.client_os ? (
              <DetailRow icon={Laptop} label="OS">
                {selected.client_os}
              </DetailRow>
            ) : null}
            <DetailRow icon={Mail} label="Email">
              <a href={`mailto:${selected.email}`} className="text-primary hover:underline">
                {selected.email}
              </a>
            </DetailRow>
            {selected.phone ? (
              <DetailRow icon={Phone} label="Phone">
                {selected.phone}
              </DetailRow>
            ) : null}
            {selected.work_location ? (
              <DetailRow icon={MapPin} label="Work location">
                {selected.work_location}
              </DetailRow>
            ) : null}
            {selected.linkedin ? (
              <DetailRow icon={User} label="LinkedIn">
                <a
                  href={selected.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-primary hover:underline"
                >
                  Profile
                </a>
              </DetailRow>
            ) : null}
            {selected.github ? (
              <DetailRow icon={User} label="GitHub">
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-primary hover:underline"
                >
                  Repository
                </a>
              </DetailRow>
            ) : null}
            {selected.resume_storage_path ? (
              <DetailRow icon={Briefcase} label="Resume file">
                <code className="break-all text-xs text-muted-foreground">{selected.resume_storage_path}</code>
              </DetailRow>
            ) : null}
            {selected.cover_letter_storage_path ? (
              <DetailRow icon={Briefcase} label="Cover letter">
                <code className="break-all text-xs text-muted-foreground">
                  {selected.cover_letter_storage_path}
                </code>
              </DetailRow>
            ) : null}
            {selected.blockchain_project_answer ? (
              <AnswerBlock label="Blockchain & web3" text={selected.blockchain_project_answer} />
            ) : null}
            {selected.description ? <AnswerBlock label="Legacy notes" text={selected.description} /> : null}
            <p className="text-xs text-muted-foreground">Submitted {formatDate(selected.created_at)}</p>
            <button
              type="button"
              disabled={pending}
              onClick={() => onDelete(selected.id)}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-destructive/50 px-3 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10 disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Remove application
            </button>
          </div>
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center text-center text-sm text-muted-foreground">
            <User className="mb-3 h-10 w-10 text-primary/40" aria-hidden />
            <p className="font-medium text-foreground">Select a candidate</p>
            <p className="mt-1 max-w-[220px] leading-relaxed">
              Choose someone from the queue to review their application details.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

function AnswerBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1.5 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-border/60 bg-secondary/30 p-3 text-xs leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function ApplicationsTable({
  applications,
  selected,
  onSelect,
}: {
  applications: ApplicationRow[];
  selected: ApplicationRow | null;
  onSelect: (row: ApplicationRow) => void;
}) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="border-b border-border/80 bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
        <tr>
          <th className="px-4 py-3 font-semibold">Candidate</th>
          <th className="px-4 py-3 font-semibold">Role</th>
          <th className="hidden px-4 py-3 font-semibold sm:table-cell">Status</th>
          <th className="hidden px-4 py-3 font-semibold md:table-cell">Email</th>
          <th className="hidden px-4 py-3 font-semibold md:table-cell">Submitted</th>
          <th className="px-4 py-3" />
        </tr>
      </thead>
      <tbody className="divide-y divide-border/60">
        {applications.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
              No applications in the queue yet.
            </td>
          </tr>
        ) : null}
        {applications.map((row) => {
          const active = selected?.id === row.id;
          return (
            <tr
              key={row.id}
              className={`transition-colors ${active ? "bg-primary/10" : "hover:bg-secondary/30"}`}
            >
              <td className="px-4 py-3 font-medium">{row.full_name}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.position}</td>
              <td className="hidden px-4 py-3 sm:table-cell">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadgeClass(row.status || "New")}`}
                >
                  {row.status || "New"}
                </span>
              </td>
              <td className="hidden px-4 py-3 md:table-cell">{row.email}</td>
              <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                {formatDate(row.created_at)}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onSelect(row)}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/10"
                >
                  Review
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}