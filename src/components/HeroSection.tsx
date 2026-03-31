import { motion } from "framer-motion";
import { ArrowRight, Shield, Globe, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { icon: Shield, label: "Secure & Compliant" },
  { icon: Globe, label: "Global Access" },
  { icon: TrendingUp, label: "Enhanced Liquidity" },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-[15%] w-48 h-48 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-6"
          >
            Real-World Asset Tokenization Protocol
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Making Every Asset{" "}
            <span className="text-gradient-primary">Available to Anyone,</span>{" "}
            <span className="text-gradient-accent">Anywhere</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            RWA Hub is a complete, integrated ecosystem supporting the entire real-world asset lifecycle — 
            from tokenization to trading, with full regulatory compliance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#contact"
              className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-primary"
            >
              Start Tokenizing <ArrowRight size={18} />
            </a>
            <a
              href="#services"
              className="border border-primary/30 text-foreground px-8 py-4 rounded-lg font-display font-semibold text-base flex items-center justify-center hover:bg-primary/5 transition-colors"
            >
              Explore Ecosystem
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-8"
          >
            {stats.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon size={18} className="text-primary" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
