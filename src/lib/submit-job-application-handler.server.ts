import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import type { Database } from "@/integrations/supabase/types";
import type { SubmitJobApplicationInput } from "./submit-job-application";

const STORAGE_BUCKET = "job-application-files";
const MAX_FILE_BYTES = 4 * 1024 * 1024;

function safeStorageSegment(name: string) {
  return name.replace(/[^\w.\-()+ ]/g, "_").slice(0, 180);
}

function adminClient() {
  const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function decodeFile(
  payload: SubmitJobApplicationInput["resume"],
  label: string,
): { buffer: Buffer } | { error: string } {
  let buffer: Buffer;
  try {
    buffer = Buffer.from(payload.base64, "base64");
  } catch {
    return { error: `Invalid ${label} file.` };
  }
  if (buffer.length === 0) return { error: `${label} file is empty.` };
  if (buffer.length > MAX_FILE_BYTES) {
    return { error: `${label} must be under 4 MB.` };
  }
  return { buffer };
}

export async function runSubmitJobApplication(data: SubmitJobApplicationInput) {
  const client = adminClient();
  if (!client) {
    return {
      ok: false as const,
      error:
        "Application storage is not configured. On Vercel set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then redeploy.",
    };
  }

  const resume = decodeFile(data.resume, "Resume");
  if ("error" in resume) return { ok: false as const, error: resume.error };

  let coverBuffer: Buffer | null = null;
  let coverMeta: SubmitJobApplicationInput["coverLetter"] = null;
  if (data.coverLetter?.base64) {
    const cover = decodeFile(data.coverLetter, "Cover letter");
    if ("error" in cover) return { ok: false as const, error: cover.error };
    coverBuffer = cover.buffer;
    coverMeta = data.coverLetter;
  }

  const folder = randomUUID();
  const resumePath = `${folder}/resume-${safeStorageSegment(data.resume.name)}`;

  const { error: resumeErr } = await client.storage
    .from(STORAGE_BUCKET)
    .upload(resumePath, resume.buffer, {
      contentType: data.resume.type || "application/octet-stream",
      upsert: false,
    });

  if (resumeErr) {
    console.error(resumeErr);
    return {
      ok: false as const,
      error:
        "Could not upload resume. Ensure the Supabase bucket job-application-files exists (run db migrations).",
    };
  }

  let coverLetterPath: string | null = null;
  if (coverBuffer && coverMeta) {
    coverLetterPath = `${folder}/cover-${safeStorageSegment(coverMeta.name)}`;
    const { error: coverErr } = await client.storage.from(STORAGE_BUCKET).upload(
      coverLetterPath,
      coverBuffer,
      {
        contentType: coverMeta.type || "application/octet-stream",
        upsert: false,
      },
    );
    if (coverErr) {
      await client.storage.from(STORAGE_BUCKET).remove([resumePath]);
      return { ok: false as const, error: "Could not upload cover letter." };
    }
  }

  const meta = data.clientMeta;
  const { error: insertErr } = await client.from("job_applications").insert({
    position: data.position?.trim() || "General",
    full_name: data.fullName.trim(),
    email: data.email.trim(),
    github: data.github.trim() || null,
    portfolio: null,
    description: null,
    phone: data.phone.trim() || null,
    linkedin: data.linkedin.trim() || null,
    resume_storage_path: resumePath,
    cover_letter_storage_path: coverLetterPath,
    blockchain_project_answer: data.blockchainAnswer.trim(),
    work_location: data.workLocation.trim(),
    wallet_installed: meta?.walletInstalled ?? false,
    client_ip: meta?.clientIp ?? null,
    client_location: meta?.clientLocation ?? null,
    client_os: meta?.clientOs ?? null,
    status: "New",
    admin_notes: null,
  });

  if (insertErr) {
    await client.storage
      .from(STORAGE_BUCKET)
      .remove([resumePath, ...(coverLetterPath ? [coverLetterPath] : [])]);
    console.error(insertErr);
    return {
      ok: false as const,
      error: insertErr.message || "Could not save application.",
    };
  }

  return { ok: true as const };
}