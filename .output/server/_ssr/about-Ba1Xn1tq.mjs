import { j as jsxRuntimeExports } from "./index.mjs";
import { P as PageLayout, m as motion, c as createLucideIcon } from "./PageLayout-BDWh79RW.mjs";
import { S as SectionHeader } from "./SectionHeader-BOcYBboC.mjs";
import { E as Eye } from "./eye-D7W5ViZR.mjs";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "./router-BAYOaKk6.mjs";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
const values = [{
  icon: Target,
  title: "Our Mission",
  description: "Provide a compliance-led infrastructure for onboarding, issuing, and administering tokenized real-world assets."
}, {
  icon: Eye,
  title: "Our Vision",
  description: "Advance market infrastructure with stronger transparency, controls, and standardized access to private and real assets."
}, {
  icon: Heart,
  title: "Our Values",
  description: "Governance, transparency, and operational discipline aligned with institutional financial standards."
}];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { tag: "About RWA Hub", title: "Institutional Infrastructure for", highlight: "Real Assets", description: "Headquartered in Miami, RWA Hub operates a compliance-led platform for tokenized real-world assets, including real estate, commodities, and funds. Our focus is governance, transparency, and reliable operational controls." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: values.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
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
    }, className: "p-6 rounded-xl bg-card border border-border hover-lift", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 24, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: item.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: item.description })
    ] }, item.title)) })
  ] }) }) });
}
export {
  AboutPage as component
};
