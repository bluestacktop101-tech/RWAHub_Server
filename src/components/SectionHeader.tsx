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
      className="text-center mb-16 md:mb-20"
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-medium tracking-wider uppercase mb-5">
        {tag}
      </span>
      <h1 className="section-heading text-foreground">
        {title}{" "}
        <span className="text-gradient-primary">{highlight}</span>
      </h1>
      {description && (
        <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
