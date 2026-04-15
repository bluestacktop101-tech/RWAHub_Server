import { motion } from "framer-motion";

interface SectionHeaderProps {
  tag: string;
  title: string;
  highlight: string;
  description?: string;
}

export default function SectionHeader({ tag, title, highlight, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-medium tracking-wider uppercase mb-4">
        {tag}
      </span>
      <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
        {title}{" "}
        <span className="text-gradient-primary">{highlight}</span>
      </h1>
      {description && (
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
