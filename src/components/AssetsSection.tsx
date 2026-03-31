import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, BarChart2, Landmark } from "lucide-react";

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

const AssetsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="assets" className="section-padding bg-navy-deep" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4">Marketplace</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Tokenized{" "}
            <span className="text-gradient-primary">Asset Classes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Three main asset types supporting diverse investment needs — all on-chain, fully transparent, and globally accessible.
          </p>
        </motion.div>

        <div className="space-y-8">
          {assetTypes.map((category, ci) => (
            <motion.div
              key={category.type}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.15 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              {/* Category header */}
              <div className="p-6 border-b border-border flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <category.icon size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-semibold">{category.type}</h3>
                    <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">{category.code}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{category.description}</p>
                </div>
              </div>

              {/* Asset items */}
              <div className="divide-y divide-border">
                {category.items.map((asset) => (
                  <div key={asset.name} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/30 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-display font-medium text-sm">{asset.name}</h4>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            asset.status === "Live"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          {asset.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground text-xs">Value</p>
                        <p className="font-semibold text-gradient-primary">{asset.value}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground text-xs">Tokens</p>
                        <p className="font-medium">{asset.tokens}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground text-xs">Price</p>
                        <p className="font-medium">{asset.price} USDC</p>
                      </div>
                      <button className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
                        {asset.status === "Live" ? "View Asset" : "Notify Me"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssetsSection;
