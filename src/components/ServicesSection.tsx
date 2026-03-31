import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Brain, Plug, Wallet, Server } from "lucide-react";

const pillars = [
  {
    icon: BarChart3,
    title: "Insights",
    description: "Comprehensive analytics and market data to help investors and asset owners make informed decisions across the RWA landscape.",
  },
  {
    icon: Brain,
    title: "Intelligence",
    description: "AI-powered tools for asset valuation, risk assessment, and market trend analysis — turning complex data into actionable intelligence.",
  },
  {
    icon: Plug,
    title: "Integrations",
    description: "Seamless connectivity between blockchain and traditional financial infrastructure through oracles and cross-chain bridges.",
  },
  {
    icon: Wallet,
    title: "Investments",
    description: "Decentralized trading with assets directly on-chain. Connect your wallet to publish and trade — truly decentralized ownership.",
  },
  {
    icon: Server,
    title: "Infrastructure",
    description: "Enterprise-grade blockchain infrastructure with smart contract automation, multi-sig security, and scalable architecture.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4">Ecosystem</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Five Integrated{" "}
            <span className="text-gradient-primary">Pillars</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The RWA Hub ecosystem is built upon five pillars, each addressing a critical aspect of the RWA lifecycle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group bg-card rounded-xl p-8 border border-border hover-lift cursor-pointer relative overflow-hidden ${
                i === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <pillar.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
