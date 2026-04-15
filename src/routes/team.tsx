import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";

const team = [
  {
    name: "Robert Beasock",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/robert-beasock-00316027/",
    photo: "/team/Robert.jpg",
  },
  {
    name: "John O'Connor",
    role: "Co-Founder",
    linkedin: "https://linkedin.com/in/john-o-connor-01940a82",
    photo: "/team/John.jpg",
  },
  {
    name: "Mykhailo Liashenko",
    role: "Chief Technology Officer",
    linkedin: "https://www.linkedin.com/in/mykhailo-liashenko-633615348/",
    photo: "/team/mykhailo.jpg",
  },
];

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Team — RWA Hub" },
      { name: "description", content: "Meet the founding team driving the future of asset tokenization." },
      { property: "og:title", content: "Our Team — RWA Hub" },
      { property: "og:description", content: "Experienced leaders in blockchain, finance, and technology." },
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
            title="Our"
            highlight="Founding Team"
            description="Experienced leaders in blockchain, finance, and technology driving the future of asset tokenization."
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
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
