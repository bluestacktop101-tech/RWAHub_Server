import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart } from "lucide-react";

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

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-navy-deep" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4">About RWA Hub</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Reshaping the Future of{" "}
            <span className="text-gradient-primary">Asset Ownership</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Headquartered in Miami, Florida, RWA Hub is a protocol designed to reshape the real-world asset tokenization landscape.
            Our integrated ecosystem addresses the fragmentation, complexity, and lack of standardization that characterize today's RWA market — 
            creating a seamless bridge between traditional finance and decentralized technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-xl p-8 border border-border hover-lift"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <item.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
