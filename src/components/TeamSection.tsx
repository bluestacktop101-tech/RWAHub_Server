import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin } from "lucide-react";

// Add photo URL for each member
const team = [
  {
    name: "Robert Beasock",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/robert-beasock-00316027/",
    photo: "/team/robert.jpg", // local image or absolute URL
  },
  {
    name: "John O'Connor",
    role: "Co-Founder",
    linkedin: "https://linkedin.com/in/john-o-connor-01940a82",
    photo: "/team/john.jpg",
  },
  {
    name: "Mykhailo Liashenko",
    role: "Chief Technology Officer",
    linkedin: "https://www.linkedin.com/in/mykhailo-liashenko-633615348/",
    photo: "/team/mykhailo.jpg",
  },
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="section-padding bg-navy-deep" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4">Leadership</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Our{" "}
            <span className="text-gradient-primary">Founding Team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Experienced leaders in blockchain, finance, and technology driving the future of asset tokenization.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover-lift"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gradient-primary">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display font-semibold text-base mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;