import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, BarChart2, Landmark, TrendingUp, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const assetTypes = [
  {
    icon: Building2,
    type: "Real Estate",
    code: "RH-10YYYY",
    description: "Residential and commercial properties. Backed by title deeds and independent valuations.",
    items: [
      {
        name: "Miami Waterfront Commercial Complex",
        location: "Miami, FL",
        pricePerToken: "$0.10",
        yield: "8.4%",
        funded: 72,
        totalValue: "$24,500,000",
        status: "Live",
      },
      {
        name: "Dubai Marina Residential Tower",
        location: "Dubai, UAE",
        pricePerToken: "$0.10",
        yield: "9.1%",
        funded: 18,
        totalValue: "$18,000,000",
        status: "Coming Soon",
      },
    ],
  },
  {
    icon: BarChart2,
    type: "Securities & Funds",
    code: "RH-20YYYY",
    description: "ETFs, equity portfolios, and other regulated financial products.",
    items: [
      {
        name: "BTC ETF Fund",
        location: "Global",
        pricePerToken: "$1.00",
        yield: "12.5%",
        funded: 86,
        totalValue: "$100,000,000",
        status: "Live",
      },
      {
        name: "Nasdaq Stock Portfolio",
        location: "United States",
        pricePerToken: "$0.10",
        yield: "7.2%",
        funded: 54,
        totalValue: "$1,000,000",
        status: "Live",
      },
    ],
  },
  {
    icon: Landmark,
    type: "Alternative Assets",
    code: "RH-30YYYY",
    description: "Income-producing real assets such as energy and infrastructure projects, supported by formal documentation.",
    items: [
      {
        name: "Siberian Green Energy BTC Mining Center",
        location: "Siberia, Russia",
        pricePerToken: "$1.00",
        yield: "14.8%",
        funded: 41,
        totalValue: "$100,000,000",
        status: "Live",
      },
    ],
  },
];

export const Route = createFileRoute("/assets")({
  component: AssetsPage,
  head: () => ({
    meta: [
      { title: "Assets — RWA Hub" },
      { name: "description", content: "Browse real-world investment opportunities — real estate, securities, and alternative assets — starting from $100." },
      { property: "og:title", content: "Available Assets — RWA Hub" },
      { property: "og:description", content: "Three categories of real-world assets you can invest in today." },
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
            title="Available"
            highlight="Asset Classes"
            description="Three categories of real-world investments — clearly priced, fully documented, and accessible from $100."
          />

          <div className="space-y-12">
            {assetTypes.map((category, ci) => (
              <motion.div
                key={category.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <category.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{category.type}</h3>
                    <p className="text-xs text-muted-foreground">{category.code} · {category.description}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="group rounded-xl bg-card border border-border p-5 flex flex-col hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="min-w-0">
                          <h4 className="font-display text-base font-semibold text-foreground leading-snug line-clamp-2">
                            {item.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
                        </div>
                        <span
                          className={`shrink-0 inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            item.status === "Live"
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="rounded-lg bg-secondary/40 p-3">
                          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Price / Token</p>
                          <p className="text-sm font-semibold text-foreground mt-1">{item.pricePerToken}</p>
                        </div>
                        <div className="rounded-lg bg-secondary/40 p-3">
                          <p className="text-[10px] uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                            <TrendingUp size={10} /> Expected Yield
                          </p>
                          <p className="text-sm font-semibold text-primary mt-1">{item.yield}</p>
                        </div>
                      </div>

                      <div className="mb-5">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-muted-foreground">Funding progress</span>
                          <span className="text-foreground font-medium">{item.funded}%</span>
                        </div>
                        <Progress value={item.funded} className="h-1.5" />
                        <p className="text-[10px] text-muted-foreground mt-2">
                          Total value: <span className="text-foreground">{item.totalValue}</span>
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                      >
                        View Details
                        <ArrowRight size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
