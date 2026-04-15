import { createFileRoute, useSearch, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowLeft, Upload, Github, Mail, FileText, User } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/apply")({
  component: ApplyPage,
  validateSearch: (search: Record<string, unknown>) => ({
    position: (search.position as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "RWA Hub" },
      { name: "description", content: "Submit your application to join the RWAHub team." },
      { property: "og:title", content: "RWA Hub" },
      { property: "og:description", content: "Submit your application to join the RWAHub team." },
    ],
  }),
});

function ApplyPage() {
  const { position } = Route.useSearch();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    github: "",
    portfolio: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("job_applications")
      .insert({
        position: position || "General",
        full_name: formData.fullName,
        email: formData.email,
        github: formData.github || null,
        portfolio: formData.portfolio,
        description: formData.description,
      });

    setSubmitting(false);

    if (insertError) {
      setError("Failed to submit application. Please try again.");
      console.error(insertError);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageLayout>
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-12 rounded-xl bg-card border border-border"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Send size={28} className="text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Application Submitted!
              </h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your interest in joining RWAHub
                {position ? ` as a ${position}` : ""}. We'll review your
                application and get back to you soon.
              </p>
              <Link
                to="/hiring"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <ArrowLeft size={14} /> Back to Open Positions
              </Link>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/hiring"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Open Positions
          </Link>

          <SectionHeader
            tag="Apply"
            title="Join"
            highlight={position || "RWAHub"}
            description={
              position
                ? `You're applying for the ${position} position. Fill in the details below.`
                : "Submit your application to join our team."
            }
          />

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-xl bg-card border border-border space-y-6"
          >
            {position && (
              <div className="px-4 py-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-sm text-primary font-medium">
                  Position: {position}
                </p>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <User size={14} className="text-muted-foreground" />
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Mail size={14} className="text-muted-foreground" />
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="you@example.com"
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Github size={14} className="text-muted-foreground" />
                GitHub Profile
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="https://github.com/yourusername"
              />
            </div>

            {/* Resume / Portfolio */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Upload size={14} className="text-muted-foreground" />
                Resume or Portfolio Link <span className="text-destructive">*</span>
              </label>
              <input
                type="url"
                name="portfolio"
                required
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Link to your resume, portfolio, or LinkedIn"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Google Drive, Dropbox, LinkedIn, or personal website
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <FileText size={14} className="text-muted-foreground" />
                Tell us about yourself <span className="text-destructive">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Share your experience, what excites you about RWAHub, and why you'd be a great fit..."
              />
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Submitting..." : <><Send size={16} /> Submit Application</>}
            </button>
          </motion.form>
        </div>
      </section>
    </PageLayout>
  );
}
