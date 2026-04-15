import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Globe, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroBg from "@/assets/hero-bg.jpg";
import PageLayout from "@/components/PageLayout";

const stats = [
  { icon: Shield, label: "Secure & Compliant" },
  { icon: Globe, label: "Global Access" },
  { icon: TrendingUp, label: "Enhanced Liquidity" },
];

export const Route = createFileRoute("/")({
  component: IndexPage,
  head: () => ({
    meta: [
      { title: "RWA Hub — Real-World Asset Tokenization Protocol" },
      { name: "description", content: "RWA Hub is a complete ecosystem for real-world asset tokenization — from creation to trading, with full regulatory compliance." },
      { property: "og:title", content: "RWA Hub — Real-World Asset Tokenization Protocol" },
      { property: "og:description", content: "Making every asset available to anyone, anywhere." },
    ],
  }),
});

function IndexPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-background/70" />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-medium tracking-wider uppercase mb-6">
              Real-World Asset Tokenization Protocol
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
          >
            Making Every Asset{" "}
            <span className="text-gradient-primary">Available to Anyone,</span>{" "}
            <span className="text-gradient-accent">Anywhere</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            RWA Hub is a complete, integrated ecosystem supporting the entire real-world asset lifecycle — from tokenization to trading, with full regulatory compliance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Start Tokenizing <ArrowRight size={16} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
            >
              Explore Ecosystem
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            {stats.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-muted-foreground">
                <Icon size={18} className="text-primary" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
