import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const team = [
  {
    name: "Robert Beasock",
    role: "Founder",
    photo: "/team/Robert.jpg",
  },
  {
    name: "John O'Connor",
    role: "Co-Founder",
    photo: "/team/John.jpg",
  },
  {
    name: "Mykhailo Liashenko",
    role: "Chief Technology Officer",
    photo: "/team/mykhailo.jpg",
  },
];

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Team — RWA Hub" },
      { name: "description", content: "Meet the founding team responsible for RWA Hub's platform governance, technology, and operations." },
      { property: "og:title", content: "Our Team — RWA Hub" },
      { property: "og:description", content: "Leadership across finance, technology, and operations for institutional-grade platform delivery." },
    ],
  }),
});

function TeamPage() {
  return (
    <PageLayout>
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="Leadership"
            title="Meet Our"
            highlight="Founding Team"
            description="Experienced leaders in finance, technology, and operations building compliance-led infrastructure for real-world asset markets."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-8 rounded-xl bg-card border border-border hover-lift"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gradient-primary">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
