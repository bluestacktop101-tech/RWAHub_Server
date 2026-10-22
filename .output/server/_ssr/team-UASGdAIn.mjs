import { j as jsxRuntimeExports } from "./index.mjs";
import { P as PageLayout, m as motion } from "./PageLayout-BDWh79RW.mjs";
import { S as SectionHeader } from "./SectionHeader-BOcYBboC.mjs";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "./router-BAYOaKk6.mjs";
const team = [{
  name: "Robert Beasock",
  role: "Founder",
  photo: "/team/Robert.jpg"
}, {
  name: "John O'Connor",
  role: "Co-Founder",
  photo: "/team/John.jpg"
}, {
  name: "Mykhailo Liashenko",
  role: "Chief Technology Officer",
  photo: "/team/mykhailo.jpg"
}];
function TeamPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { tag: "Leadership", title: "Meet Our", highlight: "Founding Team", description: "Experienced leaders in finance, technology, and operations building compliance-led infrastructure for real-world asset markets." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: team.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 30
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      duration: 0.5,
      delay: i * 0.15
    }, className: "text-center p-8 rounded-xl bg-card border border-border hover-lift", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gradient-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: member.photo, alt: member.name, className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: member.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm mt-1", children: member.role })
    ] }, member.name)) })
  ] }) }) });
}
export {
  TeamPage as component
};
