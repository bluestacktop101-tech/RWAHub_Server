import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BarChart3, Brain, Plug, Wallet, Server } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const pillars = [
  { icon: BarChart3, title: "Insights", description: "Clear analytics and market data so investors and asset owners can make informed decisions." },
  { icon: Brain, title: "Intelligence", description: "Tools for asset valuation, risk assessment, and market trends — turning data into clear insights." },
  { icon: Plug, title: "Integrations", description: "Reliable connections between our platform and traditional financial systems and data providers." },
  { icon: Wallet, title: "Investments", description: "Browse, buy, and sell fractional shares of real assets directly from your account." },
  { icon: Server, title: "Infrastructure", description: "Bank-grade infrastructure with strong security controls, automation, and reliable uptime." },
];

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — RWA Hub" },
      { name: "description", content: "Five core services that power investing in real-world assets on RWA Hub." },
      { property: "og:title", content: "Services — RWA Hub" },
      { property: "og:description", content: "Insights, valuation, integrations, investing, and infrastructure — all in one platform." },
    ],
  }),
});

function ServicesPage() {
  return (
    <PageLayout>
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="What We Offer"
            title="Five Core"
            highlight="Services"
            description="Everything you need to invest in real-world assets — research, transactions, and reliable infrastructure in one place."
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
