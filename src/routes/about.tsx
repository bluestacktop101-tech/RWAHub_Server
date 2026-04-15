import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To create a global hub for real-world asset tokenization, making every possible asset available to anyone, anywhere — with full transparency and regulatory compliance.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "A more efficient, transparent, and accessible financial system where real estate, private equity, and commodities can be tokenized, traded, and settled on-chain seamlessly.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Transparency, security, and democratized access. We believe blockchain technology can release liquidity, reduce transaction costs, and broaden investment opportunities for all.",
  },
];

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — RWA Hub" },
      { name: "description", content: "Learn about RWA Hub's mission, vision, and values in reshaping real-world asset tokenization." },
      { property: "og:title", content: "About — RWA Hub" },
      { property: "og:description", content: "Reshaping the future of asset ownership from Miami, Florida." },
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
            title="Reshaping the Future of"
            highlight="Asset Ownership"
            description="Headquartered in Miami, Florida, RWA Hub is a protocol designed to reshape the real-world asset tokenization landscape. Our integrated ecosystem addresses the fragmentation, complexity, and lack of standardization that characterize today's RWA market — creating a seamless bridge between traditional finance and decentralized technology."
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
