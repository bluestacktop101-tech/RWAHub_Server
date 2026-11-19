import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "Provide a compliance-led infrastructure for onboarding, issuing, and administering tokenized real-world assets.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "Advance market infrastructure with stronger transparency, controls, and standardized access to private and real assets.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Governance, transparency, and operational discipline aligned with institutional financial standards.",
  },
];

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — RWA Hub" },
      { name: "description", content: "RWA Hub is a compliance-led platform for institutional-grade real-world asset onboarding, issuance, and administration." },
      { property: "og:title", content: "About — RWA Hub" },
      { property: "og:description", content: "Institutional controls, transparent workflows, and compliant access to tokenized real-world assets." },
    ],
  }),
});

function AboutPage() {
  return (
    <PageLayout>
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="About RWA Hub"
            title="Institutional Infrastructure for"
            highlight="Real Assets"
            description="Headquartered in Miami, RWA Hub operates a compliance-led platform for tokenized real-world assets, including real estate, commodities, and funds. Our focus is governance, transparency, and reliable operational controls."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-6 rounded-xl bg-card border border-border hover-lift"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
