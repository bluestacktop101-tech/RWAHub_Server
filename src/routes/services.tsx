import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart3, Brain, Plug, Wallet, Server } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const pillars = [
  { icon: BarChart3, title: "Insights", description: "Comprehensive analytics and market data to help investors and asset owners make informed decisions across the RWA landscape." },
  { icon: Brain, title: "Intelligence", description: "AI-powered tools for asset valuation, risk assessment, and market trend analysis — turning complex data into actionable intelligence." },
  { icon: Plug, title: "Integrations", description: "Seamless connectivity between blockchain and traditional financial infrastructure through oracles and cross-chain bridges." },
  { icon: Wallet, title: "Investments", description: "Decentralized trading with assets directly on-chain. Connect your wallet to publish and trade — truly decentralized ownership." },
  { icon: Server, title: "Infrastructure", description: "Enterprise-grade blockchain infrastructure with smart contract automation, multi-sig security, and scalable architecture." },
];

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — RWA Hub" },
      { name: "description", content: "Explore the five integrated pillars of the RWA Hub ecosystem." },
      { property: "og:title", content: "Services — RWA Hub" },
      { property: "og:description", content: "Five integrated pillars addressing every aspect of the RWA lifecycle." },
    ],
  }),
});

function ServicesPage() {
  return (
    <PageLayout>
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="Ecosystem"
            title="Five Integrated"
            highlight="Pillars"
            description="The RWA Hub ecosystem is built upon five pillars, each addressing a critical aspect of the RWA lifecycle."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border hover-lift cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <pillar.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
