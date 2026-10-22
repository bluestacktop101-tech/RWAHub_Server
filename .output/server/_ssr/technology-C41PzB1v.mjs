import { j as jsxRuntimeExports } from "./index.mjs";
import { P as PageLayout, m as motion, c as createLucideIcon } from "./PageLayout-BDWh79RW.mjs";
import { S as SectionHeader } from "./SectionHeader-BOcYBboC.mjs";
import { L as Lock, F as FileSearch } from "./lock-BGxatsqq.mjs";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "./router-BAYOaKk6.mjs";
const __iconNode$3 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const steps = [{
  number: "01",
  title: "Asset Review",
  description: "Independent valuation, legal review, and identity checks for every asset and party involved."
}, {
  number: "02",
  title: "Listing Setup",
  description: "The asset is structured into a defined token format with documented ownership and governance terms."
}, {
  number: "03",
  title: "Compliance",
  description: "All listings follow the financial regulations of the markets where they are offered."
}, {
  number: "04",
  title: "Transfer & Settlement",
  description: "Transfers and settlement are processed through controlled workflows with auditable records."
}];
const features = [{
  icon: Lock,
  title: "Bank-Grade Security",
  description: "Multi-layer access controls and hardware-backed key storage protect funds and assets."
}, {
  icon: Cpu,
  title: "Automated Operations",
  description: "Issuance, transfers, and distributions run on audited systems with continuous monitoring."
}, {
  icon: FileSearch,
  title: "Full Audit Trail",
  description: "Every transaction is recorded and timestamped to support verifiable reporting and oversight."
}, {
  icon: Zap,
  title: "Settlement Reliability",
  description: "Settlement workflows are monitored to maintain accurate and current position records."
}, {
  icon: ShieldCheck,
  title: "KYC & AML Checks",
  description: "Identity verification and anti–money-laundering controls are built into every account."
}, {
  icon: Link2,
  title: "Trusted Data Sources",
  description: "Pricing and asset data come from established providers, not anonymous feeds."
}];
function TechnologyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { tag: "How It Works", title: "From Asset Review to", highlight: "Operational Administration", description: "A controlled process that supports compliant onboarding, structured issuance, and transparent lifecycle management." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-20", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
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
    }, className: "relative p-6 rounded-xl bg-card border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-display font-bold text-primary/20", children: step.number }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mt-2 mb-2", children: step.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: step.description }),
      i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" })
    ] }, step.number)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { tag: "Security & Trust", title: "Built on a Secure", highlight: "Foundation" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: features.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
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
    }, className: "p-6 rounded-xl bg-card border border-border hover-lift", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { size: 20, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: feature.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: feature.description })
    ] }, feature.title)) })
  ] }) }) });
}
export {
  TechnologyPage as component
};
