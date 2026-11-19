-- Job applications: optional legacy columns; new resume/cover paths + structured fields

ALTER TABLE public.job_applications
  ALTER COLUMN portfolio DROP NOT NULL,
  ALTER COLUMN description DROP NOT NULL;

ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS linkedin TEXT,
  ADD COLUMN IF NOT EXISTS resume_storage_path TEXT,
  ADD COLUMN IF NOT EXISTS cover_letter_storage_path TEXT,
  ADD COLUMN IF NOT EXISTS blockchain_project_answer TEXT,
  ADD COLUMN IF NOT EXISTS work_location TEXT;

INSERT INTO storage.buckets (id, name, public)
VALUES ('job-application-files', 'job-application-files', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Anyone can upload application files" ON storage.objects;

CREATE POLICY "Anyone can upload application files"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'job-application-files');
