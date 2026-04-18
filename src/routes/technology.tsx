import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Cpu, FileSearch, Zap, ShieldCheck, Link2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const steps = [
  { number: "01", title: "Asset Review", description: "Independent valuation, legal review, and identity checks for every asset and party involved." },
  { number: "02", title: "Listing Setup", description: "The asset is structured into affordable shares so investors can buy in starting from $100." },
  { number: "03", title: "Compliance", description: "All listings follow the financial regulations of the markets where they are offered." },
  { number: "04", title: "Trade & Settle", description: "Investors buy and sell shares directly on the platform, with fast and reliable settlement." },
];

const features = [
  { icon: Lock, title: "Bank-Grade Security", description: "Multi-layer access controls and hardware-backed key storage protect funds and assets." },
  { icon: Cpu, title: "Automated Operations", description: "Issuance, transfers, and distributions run on audited systems with continuous monitoring." },
  { icon: FileSearch, title: "Full Audit Trail", description: "Every transaction is recorded and timestamped, giving investors clear, verifiable history." },
  { icon: Zap, title: "Fast Settlement", description: "Trades settle quickly so your account always reflects an up-to-date position." },
  { icon: ShieldCheck, title: "KYC & AML Checks", description: "Identity verification and anti–money-laundering controls are built into every account." },
  { icon: Link2, title: "Trusted Data Sources", description: "Pricing and asset data come from established providers, not anonymous feeds." },
];

export const Route = createFileRoute("/technology")({
  component: TechnologyPage,
  head: () => ({
    meta: [
      { title: "How It Works — RWA Hub" },
      { name: "description", content: "See how RWA Hub takes a real-world asset from valuation to investor access — securely and transparently." },
      { property: "og:title", content: "How It Works — RWA Hub" },
      { property: "og:description", content: "Bank-grade infrastructure powering investing in real-world assets." },
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
            title="From Real Asset to"
            highlight="Your Portfolio"
            description="A clear, regulated process that turns a real asset into an affordable investment you can hold in your account."
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
