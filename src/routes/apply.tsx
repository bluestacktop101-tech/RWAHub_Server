import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { FileDropzone } from "@/components/FileDropzone";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/apply")({
  component: ApplyPage,
  validateSearch: (search: Record<string, unknown>) => ({
    position: (search.position as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Apply — RWA Hub" },
      { name: "description", content: "Submit your application to join the RWAHub team." },
      { property: "og:title", content: "Apply — RWA Hub" },
      { property: "og:description", content: "Submit your application to join the RWAHub team." },
    ],
  }),
});

const STORAGE_BUCKET = "job-application-files";

const inputClass =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10";

function safeStorageSegment(name: string): string {
  return name.replace(/[^\w.\-()+ ]/g, "_").slice(0, 180);
}

function buildLegacyDescription(formData: {
  blockchainAnswer: string;
  workLocation: string;
  phone: string;
  linkedin: string;
  github: string;
  resumePath: string;
  coverLetterPath: string | null;
}): string {
  const lines = [
    formData.blockchainAnswer.trim(),
    "",
    `Anticipated work location: ${formData.workLocation.trim()}`,
    formData.phone.trim() ? `Phone: ${formData.phone.trim()}` : null,
    formData.linkedin.trim() ? `LinkedIn: ${formData.linkedin.trim()}` : null,
    formData.github.trim() ? `GitHub: ${formData.github.trim()}` : null,
    formData.coverLetterPath ? `Cover letter (storage path): ${formData.coverLetterPath}` : null,
    `Resume (storage path): ${formData.resumePath}`,
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

/** Primary row shape (needs migration). Falls back to legacy columns if DB is older. */
async function insertJobApplication(params: {
  position: string;
  formData: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    blockchainAnswer: string;
    workLocation: string;
  };
  resumePath: string;
  coverLetterPath: string | null;
}) {
  const { position, formData, resumePath, coverLetterPath } = params;

  const fullRow = {
    position: position || "General",
    full_name: formData.fullName.trim(),
    email: formData.email.trim(),
    github: formData.github.trim() || null,
    portfolio: null as string | null,
    description: null as string | null,
    phone: formData.phone.trim() || null,
    linkedin: formData.linkedin.trim() || null,
    resume_storage_path: resumePath,
    cover_letter_storage_path: coverLetterPath,
    blockchain_project_answer: formData.blockchainAnswer.trim(),
    work_location: formData.workLocation.trim(),
  };

  const { error: fullError } = await supabase.from("job_applications").insert(fullRow);

  if (!fullError) return { ok: true as const, error: null };

  const hint = `${fullError.message ?? ""} ${(fullError as { details?: string }).details ?? ""}`.toLowerCase();
  const isRlsDeny =
    hint.includes("row-level security") ||
    hint.includes("permission denied") ||
    fullError.code === "42501";

  if (isRlsDeny) return { ok: false as const, error: fullError };

  const looksLikeLegacyDb =
    hint.includes("column") ||
    hint.includes("does not exist") ||
    hint.includes("schema cache") ||
    hint.includes("violates not-null") ||
    hint.includes("not null constraint") ||
    fullError.code === "PGRST204" ||
    fullError.code === "42703" ||
    fullError.code === "23502";

  if (!looksLikeLegacyDb) {
    return { ok: false as const, error: fullError };
  }

  const description = buildLegacyDescription({
    blockchainAnswer: formData.blockchainAnswer,
    workLocation: formData.workLocation,
    phone: formData.phone,
    linkedin: formData.linkedin,
    github: formData.github,
    resumePath,
    coverLetterPath,
  });

  const legacyRow = {
    position: position || "General",
    full_name: formData.fullName.trim(),
    email: formData.email.trim(),
    github: formData.github.trim() || null,
    portfolio: `${STORAGE_BUCKET}/${resumePath}`,
    description,
  };

  const { error: legacyError } = await supabase.from("job_applications").insert(legacyRow);

  if (!legacyError) return { ok: true as const, error: null };
  return { ok: false as const, error: legacyError };
}

function ApplyPage() {
  const { position } = Route.useSearch();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    blockchainAnswer: "",
    workLocation: "",
  });

  const roleTitle = position.trim() ? position.trim() : "General application";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!resumeFile) {
      setError("Please upload your resume.");
      return;
    }

    setSubmitting(true);

    const folder = crypto.randomUUID();

    const resumePath = `${folder}/resume-${safeStorageSegment(resumeFile.name)}`;
    const { error: resumeUploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(resumePath, resumeFile, {
        contentType: resumeFile.type || undefined,
        upsert: false,
      });

    if (resumeUploadError) {
      setSubmitting(false);
      setError("Could not upload resume. Check your connection or try again.");
      console.error(resumeUploadError);
      return;
    }

    let coverLetterPath: string | null = null;
    if (coverLetterFile) {
      coverLetterPath = `${folder}/cover-${safeStorageSegment(coverLetterFile.name)}`;
      const { error: coverErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(coverLetterPath, coverLetterFile, {
          contentType: coverLetterFile.type || undefined,
          upsert: false,
        });
      if (coverErr) {
        setSubmitting(false);
        setError("Resume was uploaded but cover letter upload failed. Please try again.");
        console.error(coverErr);
        return;
      }
    }

    const { ok, error: insertError } = await insertJobApplication({
      position,
      formData,
      resumePath,
      coverLetterPath,
    });

    setSubmitting(false);

    if (!ok && insertError) {
      const toRemove = [resumePath, ...(coverLetterPath ? [coverLetterPath] : [])];
      await supabase.storage.from(STORAGE_BUCKET).remove(toRemove);
      const detail = [insertError.message, (insertError as { details?: string }).details]
        .filter(Boolean)
        .join(" ");
      setError(detail ? `Could not save application: ${detail}` : "Failed to submit application. Please try again.");
      console.error(insertError);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageLayout>
        <section className="bg-[#f6f7f9] min-h-[calc(100vh-5rem)] py-12 md:py-16">
          <div className="max-w-[560px] mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border border-neutral-200 bg-white p-10 md:p-12 text-center shadow-sm"
            >
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
                <Send size={26} className="text-emerald-600" />
              </div>
              <h1 className="font-display text-xl font-semibold tracking-tight text-neutral-900 md:text-2xl">
                Application submitted
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Thank you for applying
                {position ? ` for ${position}` : ""}. We&apos;ll review your submission and follow up by email.
              </p>
              <Link
                to="/hiring"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                <ArrowLeft size={16} aria-hidden />
                Back to open positions
              </Link>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="bg-[#f6f7f9] min-h-[calc(100vh-5rem)] py-10 md:py-14">
        <div className="max-w-[560px] mx-auto px-4 sm:px-6">
          <Link
            to="/hiring"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to open positions
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 rounded-xl border border-neutral-200 bg-white shadow-sm"
          >
            <div className="border-b border-neutral-100 px-6 py-8 md:px-10 md:py-9">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-primary shadow-sm shadow-primary/20">
                  <img src="/logo.png" />
                </div>
                <span className="font-display text-base font-semibold tracking-tight text-neutral-900">
                  RWA <span className="text-gradient-primary">Hub</span>
                </span>
              </div>
              <h1 className="mt-6 font-display text-2xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-[1.65rem]">
                {roleTitle}{" "}
                <span className="font-normal text-neutral-500">@ RWA Hub</span>
              </h1>
              <p className="mt-3 text-sm text-neutral-600">
                Complete the form to submit your application. Fields marked with{" "}
                <span className="text-red-500">*</span> are required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-8 md:px-10 md:py-9">
              <div>
                <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-neutral-900">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  required
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-900">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>

              <FileDropzone
                label="Resume"
                required
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                file={resumeFile}
                onFileChange={setResumeFile}
                placeholder="Upload file or drag and drop here"
              />

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-neutral-900">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <FileDropzone
                label="Cover Letter"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                file={coverLetterFile}
                onFileChange={setCoverLetterFile}
                placeholder="Upload file or drag and drop here"
              />

              <div>
                <label htmlFor="linkedin" className="mb-1.5 block text-sm font-medium text-neutral-900">
                  LinkedIn Profile
                </label>
                <input
                  id="linkedin"
                  type="text"
                  name="linkedin"
                  autoComplete="url"
                  inputMode="url"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label htmlFor="github" className="mb-1.5 block text-sm font-medium text-neutral-900">
                  Github URL
                </label>
                <input
                  id="github"
                  type="text"
                  name="github"
                  autoComplete="url"
                  inputMode="url"
                  value={formData.github}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label htmlFor="blockchainAnswer" className="mb-1.5 block text-sm font-medium text-neutral-900">
                  What blockchain project are you most excited about, and how do you interact with it?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="blockchainAnswer"
                  name="blockchainAnswer"
                  required
                  rows={6}
                  value={formData.blockchainAnswer}
                  onChange={handleChange}
                  className={`${inputClass} resize-y min-h-[140px]`}
                  placeholder="Tell us about the project and how you use it (trading, building, governance, etc.)."
                />
              </div>

              <div>
                <label htmlFor="workLocation" className="mb-1.5 block text-sm font-medium text-neutral-900">
                  Anticipated Work Location (City, State) <span className="text-red-500">*</span>
                </label>
                <input
                  id="workLocation"
                  type="text"
                  name="workLocation"
                  required
                  autoComplete="address-level2"
                  value={formData.workLocation}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Austin, TX"
                />
              </div>

              {error ? (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              ) : null}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    "Submitting…"
                  ) : (
                    <>
                      <Send size={16} aria-hidden />
                      Submit application
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
