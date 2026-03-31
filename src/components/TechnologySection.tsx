import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lock, Cpu, FileSearch, Zap, ShieldCheck, Link2 } from "lucide-react";

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

const TechnologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="technology" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4">Technology</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            How{" "}
            <span className="text-gradient-primary">Tokenization Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our four-step process transforms traditional assets into blockchain-native digital tokens with full compliance.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-xl p-6 border border-border h-full">
                <span className="text-4xl font-display font-bold text-primary/20 mb-3 block">{step.number}</span>
                <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-primary/30" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Security features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon size={22} className="text-primary" />
              </div>
              <h4 className="font-display font-semibold mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
