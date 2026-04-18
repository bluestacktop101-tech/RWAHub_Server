import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "Make investing in real assets — like real estate, commodities, and private funds — simple, affordable, and accessible to anyone.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "A financial system where anyone can own a share of the assets they believe in, with clear pricing, full transparency, and strong investor protection.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Trust, transparency, and accessibility. We hold ourselves to the same standards as a regulated financial institution and put investors first.",
  },
];

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — RWA Hub" },
      { name: "description", content: "RWA Hub is a financial platform that makes investing in real-world assets simple, transparent, and accessible from $100." },
      { property: "og:title", content: "About — RWA Hub" },
      { property: "og:description", content: "A modern way to invest in real-world assets — built on trust and transparency, headquartered in Miami." },
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
            title="A New Way to Invest in"
            highlight="Real Assets"
            description="Headquartered in Miami, RWA Hub is a financial platform that makes real-world assets — real estate, commodities, and funds — accessible to everyday investors. We pair the trust of regulated finance with the simplicity of a modern app."
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
