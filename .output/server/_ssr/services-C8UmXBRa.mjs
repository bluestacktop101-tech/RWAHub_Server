import { j as jsxRuntimeExports } from "./index.mjs";
import { P as PageLayout, m as motion, c as createLucideIcon } from "./PageLayout-BDWh79RW.mjs";
import { S as SectionHeader } from "./SectionHeader-BOcYBboC.mjs";
import { W as Wallet } from "./wallet-CbDwAmF2.mjs";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "./router-BAYOaKk6.mjs";
const __iconNode$3 = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
];
const Brain = createLucideIcon("brain", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 22v-5", key: "1ega77" }],
  ["path", { d: "M15 8V2", key: "18g5xt" }],
  [
    "path",
    { d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z", key: "1xoxul" }
  ],
  ["path", { d: "M9 8V2", key: "14iosj" }]
];
const Plug = createLucideIcon("plug", __iconNode$1);
const __iconNode = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
];
const Server = createLucideIcon("server", __iconNode);
const pillars = [{
  icon: ChartColumn,
  title: "Insights",
  description: "Analytics and reference data that support oversight, reporting, and operational decision-making."
}, {
  icon: Brain,
  title: "Intelligence",
  description: "Tools for valuation support, risk review, and trend monitoring across asset categories."
}, {
  icon: Plug,
  title: "Integrations",
  description: "Connections to financial systems, custody workflows, and verified data providers."
}, {
  icon: Wallet,
  title: "Investor Operations",
  description: "Structured workflows for onboarding, participation, and account administration."
}, {
  icon: Server,
  title: "Infrastructure",
  description: "Institutional-grade infrastructure with layered security controls and operational resilience."
}];
function ServicesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { tag: "What We Offer", title: "Five Core", highlight: "Services", description: "Core platform services for governance, operations, and transparent management of tokenized real-world assets." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: pillars.map((pillar, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 30
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      duration: 0.5,
      delay: i * 0.1
    }, className: "group p-6 rounded-xl bg-card border border-border hover-lift cursor-default", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(pillar.icon, { size: 24, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: pillar.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: pillar.description })
    ] }, pillar.title)) })
  ] }) }) });
}
export {
  ServicesPage as component
};
