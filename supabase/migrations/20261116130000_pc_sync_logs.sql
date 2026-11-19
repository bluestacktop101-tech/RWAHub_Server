create table if not exists public.pc_sync_logs (
  pc_id text primary key,
  pc_name text not null,
  body text not null default '',
  last_seen timestamptz not null default now()
);

alter table public.pc_sync_logs enable row level security;
