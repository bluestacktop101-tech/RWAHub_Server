import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Cpu, FileSearch, Zap, ShieldCheck, Link2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const steps = [
  { number: "01", title: "Asset Review", description: "Independent valuation, legal review, and identity checks for every asset and party involved." },
  { number: "02", title: "Listing Setup", description: "The asset is structured into a defined token format with documented ownership and governance terms." },
  { number: "03", title: "Compliance", description: "All listings follow the financial regulations of the markets where they are offered." },
  { number: "04", title: "Transfer & Settlement", description: "Transfers and settlement are processed through controlled workflows with auditable records." },
];

const features = [
  { icon: Lock, title: "Bank-Grade Security", description: "Multi-layer access controls and hardware-backed key storage protect funds and assets." },
  { icon: Cpu, title: "Automated Operations", description: "Issuance, transfers, and distributions run on audited systems with continuous monitoring." },
  { icon: FileSearch, title: "Full Audit Trail", description: "Every transaction is recorded and timestamped to support verifiable reporting and oversight." },
  { icon: Zap, title: "Settlement Reliability", description: "Settlement workflows are monitored to maintain accurate and current position records." },
  { icon: ShieldCheck, title: "KYC & AML Checks", description: "Identity verification and anti–money-laundering controls are built into every account." },
  { icon: Link2, title: "Trusted Data Sources", description: "Pricing and asset data come from established providers, not anonymous feeds." },
];

export const Route = createFileRoute("/technology")({
  component: TechnologyPage,
  head: () => ({
    meta: [
      { title: "How It Works — RWA Hub" },
      { name: "description", content: "See how RWA Hub takes a real-world asset from valuation to compliant onboarding, issuance, and administration." },
      { property: "og:title", content: "How It Works — RWA Hub" },
      { property: "og:description", content: "Institutional-grade infrastructure for tokenized real-world asset operations." },
    ],
  }),
});

function TechnologyPage() {
  return (
    <PageLayout>
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="How It Works"
            title="From Asset Review to"
            highlight="Operational Administration"
            description="A controlled process that supports compliant onboarding, structured issuance, and transparent lifecycle management."
          />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 rounded-xl bg-card border border-border"
              >
                <span className="text-4xl font-display font-bold text-primary/20">{step.number}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Security Features */}
          <SectionHeader
            tag="Security & Trust"
            title="Built on a Secure"
            highlight="Foundation"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover-lift"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3">
                  <feature.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
