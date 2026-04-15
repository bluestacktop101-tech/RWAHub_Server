import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, BarChart2, Landmark } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const assetTypes = [
  {
    icon: Building2,
    type: "Real Property",
    code: "RH-10YYYY",
    items: [
      { name: "Miami Waterfront Commercial Complex", value: "$24,500,000", tokens: "245,000,000", price: "$0.10", status: "Live" },
      { name: "Dubai Marina Residential Tower", value: "$18,000,000", tokens: "180,000,000", price: "$0.10", status: "Coming Soon" },
    ],
    description: "Token amount = Area × 10,000. Requires property certificate, land certificate documentation.",
  },
  {
    icon: BarChart2,
    type: "Securities",
    code: "RH-20YYYY",
    items: [
      { name: "BTC ETF Fund", value: "$100,000,000", tokens: "100,000,000", price: "$1.00", status: "Live" },
      { name: "Nasdaq Stock Portfolio", value: "$1,000,000", tokens: "10,000,000", price: "$0.10", status: "Live" },
    ],
    description: "Stocks, ETFs, and financial assets with customizable token amounts.",
  },
  {
    icon: Landmark,
    type: "Quasi Property",
    code: "RH-30YYYY",
    items: [
      { name: "Siberian Green Energy BTC Mining Center", value: "$100,000,000", tokens: "100,000,000", price: "$1.00", status: "Live" },
    ],
    description: "Commercial and similar real estate. Requires auction and exhibition documentation.",
  },
];

export const Route = createFileRoute("/assets")({
  component: AssetsPage,
  head: () => ({
    meta: [
      { title: "Assets — RWA Hub" },
      { name: "description", content: "Browse tokenized asset classes — real property, securities, and quasi property — all on-chain." },
      { property: "og:title", content: "Tokenized Assets — RWA Hub" },
      { property: "og:description", content: "Three main asset types supporting diverse investment needs." },
    ],
  }),
});

function AssetsPage() {
  return (
    <PageLayout>
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="Marketplace"
            title="Tokenized"
            highlight="Asset Classes"
            description="Three main asset types supporting diverse investment needs — all on-chain, fully transparent, and globally accessible."
          />

          <div className="space-y-8">
            {assetTypes.map((category, ci) => (
              <motion.div
                key={category.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.15 }}
                className="rounded-xl bg-card border border-border overflow-hidden"
              >
                <div className="p-6 border-b border-border flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <category.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{category.type}</h3>
                    <p className="text-xs text-muted-foreground">{category.code} · {category.description}</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground text-left">
                        <th className="px-6 py-3 font-medium">Asset</th>
                        <th className="px-6 py-3 font-medium">Value</th>
                        <th className="px-6 py-3 font-medium">Tokens</th>
                        <th className="px-6 py-3 font-medium">Price</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item) => (
                        <tr key={item.name} className="border-b border-border/50 last:border-0">
                          <td className="px-6 py-4 text-foreground font-medium">{item.name}</td>
                          <td className="px-6 py-4 text-muted-foreground">{item.value}</td>
                          <td className="px-6 py-4 text-muted-foreground">{item.tokens}</td>
                          <td className="px-6 py-4 text-primary font-medium">{item.price}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.status === "Live"
                                ? "bg-primary/10 text-primary"
                                : "bg-accent/10 text-accent"
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
