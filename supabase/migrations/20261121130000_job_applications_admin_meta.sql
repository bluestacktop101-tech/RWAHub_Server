-- Blocvora hiring admin: device / geo capture + pipeline status + notes

ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS wallet_installed BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS client_ip TEXT,
  ADD COLUMN IF NOT EXISTS client_location TEXT,
  ADD COLUMN IF NOT EXISTS client_os TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'New',
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

CREATE INDEX IF NOT EXISTS job_applications_status_idx ON public.job_applications (status);