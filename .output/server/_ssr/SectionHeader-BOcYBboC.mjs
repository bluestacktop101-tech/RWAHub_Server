import { j as jsxRuntimeExports } from "./index.mjs";
import { m as motion } from "./PageLayout-BDWh79RW.mjs";
function SectionHeader({ tag, title, highlight, description }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6 },
      className: "text-center mb-16 md:mb-20",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-medium tracking-wider uppercase mb-5", children: tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "section-heading text-foreground", children: [
          title,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-primary", children: highlight })
        ] }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed", children: description })
      ]
    }
  );
}
export {
  SectionHeader as S
};
