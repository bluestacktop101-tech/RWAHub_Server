import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Cpu, FileSearch, Zap, ShieldCheck, Link2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const steps = [
  { number: "01", title: "Asset Valuation", description: "Independent appraisal, legal structuring, and KYC/AML verification of all parties involved." },
  { number: "02", title: "Token Creation", description: "Smart contracts deployed using NFTs for unique assets and ERC standards for fungible assets." },
  { number: "03", title: "Compliance", description: "Regulatory compliance embedded into smart contract codebase across all operating jurisdictions." },
  { number: "04", title: "Market Access", description: "Decentralized trading with instant settlement — connect your wallet to trade directly on-chain." },
];

const features = [
  { icon: Lock, title: "Multi-Sig Security", description: "Multi-signature wallets and hardware security modules protecting all platform assets." },
  { icon: Cpu, title: "Smart Contracts", description: "Audited contracts handling issuance, transfers, and distributions with AI-powered monitoring." },
  { icon: FileSearch, title: "Full Audit Trail", description: "Every transaction immutably recorded on blockchain — transparent and tamper-proof." },
  { icon: Zap, title: "Instant Settlement", description: "T+0 settlement eliminating counterparty risk with assets stored in users' personal wallets." },
  { icon: ShieldCheck, title: "KYC/AML Protocols", description: "Comprehensive identity verification and anti-money laundering compliance built-in." },
  { icon: Link2, title: "Oracle Integration", description: "Seamless connectivity between blockchain and traditional financial infrastructures." },
];

export const Route = createFileRoute("/technology")({
  component: TechnologyPage,
  head: () => ({
    meta: [
      { title: "Technology — RWA Hub" },
      { name: "description", content: "Explore the tokenization process and security features powering RWA Hub." },
      { property: "og:title", content: "Technology — RWA Hub" },
      { property: "og:description", content: "Enterprise-grade blockchain infrastructure for real-world assets." },
    ],
  }),
});

function TechnologyPage() {
  return (
    <PageLayout>
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="Technology"
            title="Tokenization"
            highlight="Process"
            description="A standardized, secure process from asset valuation to market access."
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
            tag="Security"
            title="Enterprise-Grade"
            highlight="Infrastructure"
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
