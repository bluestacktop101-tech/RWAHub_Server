import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Globe, TrendingUp, BadgeCheck, Layers, Wallet, LineChart, Scale, FileSearch, Lock, Eye } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroBg from "@/assets/hero-bg.jpg";
import PageLayout from "@/components/PageLayout";

const platformStats = [
  { value: "$240M+", label: "Assets under management" },
  { value: "12,000+", label: "Active investors" },
  { value: "9.4%", label: "Avg. annual yield" },
  { value: "60+", label: "Countries supported" },
];

const trustBadges = [
  { icon: Shield, label: "Regulated entity" },
  { icon: Globe, label: "Available worldwide" },
  { icon: TrendingUp, label: "Start from $100" },
];

const steps = [
  { icon: BadgeCheck, title: "Assets are verified", description: "Every asset is reviewed and documented before it's listed." },
  { icon: Layers, title: "Tokenized into shares", description: "Ownership is split into affordable digital shares." },
  { icon: Wallet, title: "Users invest", description: "Buy a share online in minutes, starting from $100." },
  { icon: LineChart, title: "Earn returns and trade", description: "Receive income and trade your shares anytime." },
];

const trustItems = [
  { icon: Scale, title: "Legal structure", description: "Each asset is held within a regulated legal entity." },
  { icon: FileSearch, title: "Asset verification", description: "Independent audits and documentation for every listing." },
  { icon: Lock, title: "Secure custody", description: "Funds and assets safeguarded by licensed custodians." },
  { icon: Eye, title: "Transparency", description: "Full visibility into ownership, fees, and performance." },
];

export const Route = createFileRoute("/")({
  component: IndexPage,
  head: () => ({
    meta: [
      { title: "RWA Hub — Invest in Real-World Assets from $100" },
      { name: "description", content: "RWA Hub lets you invest in real estate, commodities, and other tangible assets online — starting at $100, with full transparency and regulatory protection." },
      { property: "og:title", content: "RWA Hub — Invest in Real-World Assets from $100" },
      { property: "og:description", content: "Buy a fraction of real assets online. Simple, secure, and accessible from anywhere." },
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-semibold tracking-wider uppercase mb-6 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live Investment Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight"
          >
            Invest in{" "}
            <span className="text-gradient-primary">real-world assets</span>{" "}
            from <span className="text-gradient-accent">$100</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Buy a fraction of real estate, gold, and other tangible assets online — fully documented, regulated, and accessible from anywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/assets"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Explore Marketplace <ArrowRight size={16} />
            </Link>
            <Link
              to="/technology"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-border text-foreground font-medium text-base hover:bg-secondary transition-colors"
            >
              How It Works
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3"
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-muted-foreground">
                <Icon size={16} className="text-primary" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Platform stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border max-w-4xl mx-auto"
          >
            {platformStats.map((s) => (
              <div key={s.label} className="bg-card px-4 py-5 text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-xs font-medium tracking-wider uppercase mb-5">
              How It Works
            </span>
            <h2 className="section-heading text-foreground">
              From real asset to your portfolio
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              A simple, transparent process — from verification to earning returns.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative rounded-xl bg-card border border-border p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Step {i + 1}</span>
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section-padding border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-xs font-medium tracking-wider uppercase mb-5">
              Trust & Safety
            </span>
            <h2 className="section-heading text-foreground">
              Built on a foundation of trust
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              Investor protection is at the core of everything we do.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {trustItems.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl bg-card border border-border p-6 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-card border border-border p-10 md:p-16 text-center"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-xs font-medium tracking-wider uppercase mb-5">
                Get Started
              </span>
              <h2 className="section-heading text-foreground max-w-2xl">
                Start investing in{" "}
                <span className="text-gradient-primary">real-world assets</span>{" "}
                today
              </h2>
              <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Browse verified opportunities and build your portfolio from $100.
              </p>
              <Link
                to="/assets"
                className="mt-8 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity"
              >
                Explore Marketplace <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
