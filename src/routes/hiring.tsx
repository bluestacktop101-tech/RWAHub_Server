import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/PageLayout";
import SectionHeader from "../components/SectionHeader";
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/hiring")({
  head: () => ({
    meta: [
      { title: "We're Hiring — RWA Hub" },
      { name: "description", content: "Join RWAHub and help build the future of real-world asset tokenization. Explore open positions in engineering, design, product, and more." },
      { property: "og:title", content: "We're Hiring — RWA Hub" },
      { property: "og:description", content: "Join RWAHub and help build the future of real-world asset tokenization." },
    ],
  }),
  component: HiringPage,
});

interface JobPosition {
  title: string;
  category: string;
  location: string;
  type: string;
  notionUrl: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  techStack: string[];
  whyThisRole: string[];
  howToApply: string[];
}

const jobs: JobPosition[] = [
  {
    title: "Product Manager",
    category: "Product",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Product-Manager-34203938ce4280399e3dc5f844cd3d75",
    description: "You'll sit between users, business, and engineering — helping turn ideas into shipped product.",
    responsibilities: [
      "Defining product roadmap and prioritizing features",
      "Working closely with engineers (frontend, backend, blockchain)",
      "Translating user needs into clear product requirements",
      "Managing MVP → V1 evolution of the platform",
      "Helping design end-to-end user flows (onboarding, trading, asset creation)",
      "Coordinating across smart contract, backend, and frontend teams",
      "Writing clear specs, user stories, and acceptance criteria",
      "Tracking product metrics and user behavior",
    ],
    requirements: [
      "Experience as a Product Manager in tech or startups",
      "Strong ability to translate complex systems into simple product flows",
      "Comfortable working with engineers (especially in technical products)",
      "Understanding of web platforms and APIs",
      "Strong communication and structured thinking",
      "Ability to work in fast-moving, early-stage environments",
    ],
    niceToHave: [
      "Experience in Web3, DeFi, or crypto products",
      "Familiarity with tokenization or blockchain-based systems",
      "Understanding of financial products or marketplaces",
      "Experience working in 0→1 startups",
      "Basic technical understanding (React, APIs, smart contracts)",
    ],
    techStack: ["React / Next.js", "Node.js", "Ethereum + L2 (Polygon / Arbitrum)", "Solidity", "IPFS + off-chain systems"],
    whyThisRole: [
      "Shape how real-world assets are tokenized and traded",
      "High ownership from day one",
      "Direct collaboration with founders and engineering team",
      "Early-stage equity / token upside",
    ],
    howToApply: ["CV / LinkedIn", "Examples of products you've worked on", "Short note on your experience with marketplaces, fintech, or Web3 products"],
  },
  {
    title: "Project Manager",
    category: "Product",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Project-Manager-34203938ce428080ba01cd07562b138a",
    description: "You'll be responsible for making sure the team is aligned, execution is clear, and delivery actually happens.",
    responsibilities: [
      "Managing day-to-day execution across engineering and product teams",
      "Breaking down roadmap into clear tasks, milestones, and timelines",
      "Coordinating between frontend, backend, and blockchain developers",
      "Tracking progress and making sure deadlines are realistic and met",
      "Running sprint planning, standups, and delivery reviews",
      "Identifying blockers early and helping remove them",
      "Keeping communication structured across the team",
      "Supporting founders with operational clarity and execution tracking",
    ],
    requirements: [
      "Experience as a Project Manager or Delivery Manager in tech or startups",
      "Strong organizational and communication skills",
      "Ability to manage multiple moving parts without losing clarity",
      "Comfortable working with engineering teams",
      "Experience with Agile / sprint-based workflows",
      "Ability to work in early-stage, fast-changing environments",
    ],
    niceToHave: [
      "Experience in Web3, crypto, or fintech projects",
      "Understanding of blockchain development lifecycle",
      "Familiarity with tools like Jira, Linear, Notion, Trello",
      "Experience working in 0→1 startups",
    ],
    techStack: ["React / Next.js", "Node.js", "Ethereum + L2 (Polygon / Arbitrum)", "Solidity", "IPFS + off-chain systems"],
    whyThisRole: [
      "Key role in keeping the entire system moving",
      "High ownership from day one",
      "Direct visibility into product and protocol development",
      "Early-stage equity / token upside",
    ],
    howToApply: ["CV / LinkedIn", "Examples of projects or teams you've managed", "Short note on how you manage execution in fast-moving technical teams"],
  },
  {
    title: "Tech Lead",
    category: "Engineering",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Tech-Lead-34203938ce428077accfd13263010251",
    description: "You'll be responsible for leading the technical direction across frontend, backend, and blockchain integration. Hands-on leadership — you will still code, but you'll also shape architecture.",
    responsibilities: [
      "Own overall system architecture (frontend, backend, blockchain)",
      "Lead development of core platform features end-to-end",
      "Guide smart contract integration with backend and frontend systems",
      "Review code and set engineering standards",
      "Make technical decisions around scalability, performance, and security",
      "Coordinate across engineers (frontend, backend, blockchain)",
      "Help define long-term technical roadmap with founders",
      "Ensure clean, maintainable, and production-ready codebase",
    ],
    requirements: [
      "Strong full-stack development experience (React + Node.js or similar)",
      "Solid understanding of system design and scalable architecture",
      "Experience working with APIs, distributed systems, or complex backend logic",
      "Comfortable working with engineers across multiple domains",
      "Ability to lead technically without heavy bureaucracy",
      "Experience in fast-moving startup environments",
    ],
    niceToHave: [
      "Experience with Solidity and EVM ecosystems",
      "Understanding of smart contract architecture and security basics",
      "Experience integrating blockchain into web applications",
      "Familiarity with L2 ecosystems (Polygon, Arbitrum, zkSync)",
    ],
    techStack: ["React / Next.js", "Node.js (future Rust migration)", "Ethereum + L2", "Solidity", "IPFS + off-chain systems"],
    whyThisRole: [
      "Core leadership position in the engineering team",
      "High technical ownership from day one",
      "Direct influence on architecture and product direction",
      "Equity / token upside in an early-stage protocol",
    ],
    howToApply: ["GitHub / portfolio", "Examples of systems or products you've led or built", "Short note on your experience with architecture, scaling systems, or Web3"],
  },
  {
    title: "Full Stack Blockchain Developer",
    category: "Engineering",
    location: "Fully Remote / Global",
    type: "Full-Time / Part-Time",
    notionUrl: "https://www.notion.so/Full-Stack-Blockchain-Developer-34203938ce42804ca50af610ba007421",
    description: "You'll work across the stack — from frontend interfaces to backend services and blockchain integrations.",
    responsibilities: [
      "Building and improving frontend features in React / Next.js",
      "Integrating smart contracts with the UI (wallet flows, transactions, state updates)",
      "Supporting backend development (Node.js APIs, services, off-chain logic)",
      "Working with blockchain data (events, indexing, on-chain reads/writes)",
      "Helping connect on-chain and off-chain systems",
      "Collaborating with smart contract engineers on product flows",
    ],
    requirements: [
      "Strong experience with JavaScript / TypeScript",
      "Good hands-on experience with React / Next.js",
      "Experience building backend services with Node.js",
      "Familiarity with blockchain basics (wallets, transactions, smart contracts)",
      "Experience integrating Web3 libraries (ethers.js / viem / wagmi)",
      "Comfortable working in early-stage environments",
    ],
    niceToHave: [
      "Experience with Solidity or reading smart contracts",
      "Understanding of EVM ecosystems (Ethereum, Polygon, Arbitrum)",
      "Experience with indexing tools (The Graph or event-based systems)",
      "Knowledge of DeFi or NFT systems",
    ],
    techStack: ["React / Next.js", "Node.js (future Rust migration)", "Ethereum + L2", "Solidity", "IPFS + off-chain databases"],
    whyThisRole: [
      "Full-stack ownership across Web2 + Web3",
      "Early-stage equity / token upside",
      "Close collaboration with core founders and protocol engineers",
      "Real impact on product direction",
    ],
    howToApply: ["GitHub / portfolio", "Projects you've built (frontend, backend, or Web3)", "Short note on your experience with React + Node + Web3"],
  },
  {
    title: "Blockchain Engineer",
    category: "Engineering",
    location: "Fully Remote / Global",
    type: "Full-Time / Part-Time",
    notionUrl: "https://www.notion.so/Blockchain-Engineer-34203938ce428006b109eb3110481ddd",
    description: "You'll be working on the core smart contract layer of the platform.",
    responsibilities: [
      "Designing and building tokenization logic for real-world assets",
      "Implementing fractional ownership and transfer rules",
      "Building marketplace contracts (listings, trading, settlement)",
      "Working with token standards like ERC-721 / ERC-1155 / ERC-3643",
      "Making sure contracts are secure, testable, and audit-ready",
      "Connecting smart contracts with frontend and backend systems",
      "Helping shape architecture decisions (L2, storage, system design)",
    ],
    requirements: [
      "Strong experience with Solidity and EVM development",
      "Experience shipping production smart contracts",
      "Good understanding of token standards (ERC-20 / ERC-721 / ERC-1155)",
      "Experience with Hardhat or Foundry",
      "Strong understanding of smart contract security",
      "Comfortable writing tests and working with deployment pipelines",
    ],
    niceToHave: [
      "Experience with DeFi protocols (DEXs, lending, staking)",
      "Exposure to real-world asset tokenization or compliance-aware tokens",
      "Experience with Layer 2 networks (Polygon, Arbitrum, zkSync)",
      "Wallet integrations (MetaMask, WalletConnect)",
      "Indexing tools (The Graph or similar)",
    ],
    techStack: ["Solidity", "React / Next.js", "Node.js (moving toward Rust)", "Ethereum + L2", "IPFS + hybrid off-chain storage"],
    whyThisRole: [
      "Work on the foundation of a real-world asset protocol",
      "Real ownership in what you build",
      "Early-stage equity / token upside",
      "High-impact engineering work from day one",
    ],
    howToApply: ["GitHub / portfolio", "Relevant smart contract work", "Short note on your experience in DeFi or token-based systems"],
  },
  {
    title: "Frontend Developer",
    category: "Engineering",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Frontend-Developer-34203938ce42800d8e69cabc5ac65ee5",
    description: "You'll be responsible for building and improving the user-facing side of the platform.",
    responsibilities: [
      "Building responsive UI features in React / Next.js",
      "Integrating Web3 functionality (wallets, transactions, on-chain data)",
      "Working closely with backend and smart contract engineers",
      "Improving UX for blockchain interactions",
      "Handling state management and API integration",
      "Debugging and improving frontend performance",
    ],
    requirements: [
      "Strong experience with React and modern JavaScript / TypeScript",
      "Experience with Next.js or similar frameworks",
      "Solid understanding of building real-world web applications",
      "Comfortable working with APIs and dynamic data",
      "Basic understanding of blockchain concepts",
    ],
    niceToHave: [
      "Experience with Web3 libraries (ethers.js, viem, wagmi)",
      "Familiarity with wallet integrations (MetaMask, WalletConnect)",
      "Understanding of smart contract interactions",
      "Strong UI/UX intuition",
    ],
    techStack: ["React / Next.js", "Node.js", "Ethereum + L2", "Solidity", "IPFS + off-chain systems"],
    whyThisRole: [
      "High ownership of frontend and product experience",
      "Early-stage equity / token upside",
      "Direct collaboration with founders and core engineers",
      "Real impact on how the product feels and works",
    ],
    howToApply: ["GitHub / portfolio", "Relevant frontend projects", "Short note on your experience with React and any Web3 integrations"],
  },
  {
    title: "Backend Developer",
    category: "Engineering",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Backend-Developer-34203938ce42808f9510d838b781a119",
    description: "You'll be responsible for building and scaling the backend systems that power the platform.",
    responsibilities: [
      "Building and maintaining backend APIs and services",
      "Designing scalable architecture for marketplace and asset workflows",
      "Integrating with blockchain smart contracts (event listening, indexing, data sync)",
      "Managing off-chain logic for listings, users, and transactions",
      "Working closely with frontend and smart contract engineers",
      "Designing data models for real-world asset tokenization flows",
    ],
    requirements: [
      "Strong backend development experience in Node.js, Rust, Go, or Python",
      "Experience building production-grade APIs and services",
      "Understanding of databases (SQL and/or NoSQL)",
      "Experience working with distributed systems or scalable architectures",
      "Ability to write clean, maintainable, and well-structured code",
    ],
    niceToHave: [
      "Experience with blockchain or Web3 systems",
      "Familiarity with smart contracts (Solidity, EVM ecosystems)",
      "Experience with event-driven architecture or message queues",
      "Knowledge of authentication, security, and access control systems",
    ],
    techStack: ["Node.js (Rust / Go / Python possible)", "React / Next.js", "Ethereum + L2", "Solidity", "IPFS + off-chain databases"],
    whyThisRole: [
      "High ownership of backend architecture",
      "Early-stage equity / token upside",
      "Real impact on system design and scalability",
      "Close collaboration with core team",
    ],
    howToApply: ["GitHub / portfolio", "Backend systems or APIs you've built", "Short note on your experience with backend architecture and blockchain systems"],
  },
  {
    title: "DevOps Engineer",
    category: "Engineering",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Backend-Developer-34203938ce42808f9510d838b781a119",
    description: "You'll be responsible for infrastructure, CI/CD, and ensuring reliable deployments across the platform.",
    responsibilities: [
      "Setting up and maintaining CI/CD pipelines",
      "Managing cloud infrastructure and deployments",
      "Ensuring system reliability, monitoring, and alerting",
      "Supporting blockchain node infrastructure",
      "Working closely with backend and blockchain engineers",
      "Automating development and deployment workflows",
    ],
    requirements: [
      "Strong experience with cloud platforms (AWS, GCP, or Azure)",
      "Experience with CI/CD tools and containerization (Docker, Kubernetes)",
      "Understanding of infrastructure as code (Terraform, Pulumi)",
      "Experience with monitoring and logging systems",
      "Comfortable working in early-stage environments",
    ],
    niceToHave: [
      "Experience with blockchain node management",
      "Familiarity with Web3 infrastructure",
      "Experience with microservices architecture",
      "Knowledge of security best practices",
    ],
    techStack: ["Docker / Kubernetes", "AWS / GCP", "Node.js", "Ethereum + L2", "CI/CD tools"],
    whyThisRole: [
      "Own the infrastructure of a Web3 platform",
      "Early-stage equity / token upside",
      "Direct impact on system reliability",
      "Close collaboration with engineering team",
    ],
    howToApply: ["CV / LinkedIn", "Infrastructure projects you've managed", "Short note on your DevOps experience"],
  },
  {
    title: "QA Engineer",
    category: "Engineering",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/QA-Engineer-34203938ce4280718097e9d967403ee8",
    description: "You'll be responsible for making sure everything we build actually works — across frontend, backend, and blockchain interactions.",
    responsibilities: [
      "Testing web application features (UI, API, workflows)",
      "Validating end-to-end user flows (wallet connection, transactions, trading)",
      "Testing smart contract interactions (basic functional validation)",
      "Identifying bugs, edge cases, and usability issues",
      "Writing and maintaining test cases and QA documentation",
      "Working closely with frontend, backend, and blockchain developers",
      "Supporting regression testing before releases",
    ],
    requirements: [
      "Experience in QA, testing, or software quality assurance roles",
      "Strong attention to detail",
      "Experience testing web applications and APIs",
      "Understanding of end-to-end testing workflows",
      "Ability to clearly report bugs and reproduce issues",
    ],
    niceToHave: [
      "Experience with Web3 applications (wallets, transactions, dApps)",
      "Familiarity with testing tools (Playwright, Cypress, Selenium)",
      "Basic understanding of APIs and backend systems",
      "Experience testing blockchain interactions",
    ],
    techStack: ["React / Next.js", "Node.js", "Ethereum + L2", "Solidity", "IPFS + off-chain systems"],
    whyThisRole: [
      "High ownership of product quality",
      "Early-stage equity / token upside",
      "Direct collaboration with founders and engineers",
      "Real impact on user experience and reliability",
    ],
    howToApply: ["CV / LinkedIn", "Examples of testing or QA work you've done", "Short note on your experience with web or Web3 testing"],
  },
  {
    title: "Mobile Developer",
    category: "Engineering",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Mobile-Developer-34203938ce4280749b5cf57dc071472d",
    description: "You'll be responsible for building the mobile experience of the RWAHub platform.",
    responsibilities: [
      "Building mobile applications using React Native (or similar framework)",
      "Implementing wallet connection flows and Web3 interactions",
      "Integrating smart contract actions into mobile UI",
      "Working closely with frontend, backend, and blockchain engineers",
      "Building smooth user flows for onboarding, trading, and asset management",
      "Ensuring performance, responsiveness, and stability on mobile devices",
    ],
    requirements: [
      "Strong experience in mobile development (React Native preferred)",
      "Experience building production mobile applications",
      "Good understanding of APIs and frontend-backend integration",
      "Comfortable working with modern JavaScript / TypeScript",
      "Strong attention to mobile UX and performance",
    ],
    niceToHave: [
      "Experience with Web3 mobile apps or dApps",
      "Familiarity with wallet integrations (MetaMask Mobile, WalletConnect)",
      "Understanding of blockchain interactions and smart contracts",
      "Experience with native modules (iOS / Android)",
    ],
    techStack: ["React Native", "React / Next.js", "Node.js", "Ethereum + L2", "IPFS + off-chain systems"],
    whyThisRole: [
      "High ownership of mobile product experience",
      "Early-stage equity / token upside",
      "Direct collaboration with founders and engineers",
      "Real impact on product direction and user adoption",
    ],
    howToApply: ["CV / LinkedIn", "Mobile apps you've built (App Store / GitHub / demos)", "Short note on your experience with mobile development and Web3"],
  },
  {
    title: "Product Designer",
    category: "Design",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Product-Designer-34203938ce428020bb65f4a3cbc75dac",
    description: "You'll own how the product looks, feels, and behaves.",
    responsibilities: [
      "Designing end-to-end user flows (onboarding, wallet connection, trading, asset creation)",
      "Creating clean, simple UI for complex Web3 interactions",
      "Working closely with frontend and product teams",
      "Improving UX for blockchain-based actions",
      "Building and maintaining design systems for scalability",
      "Translating early product ideas into wireframes and prototypes",
    ],
    requirements: [
      "Strong experience in product design (web applications)",
      "Good understanding of UX principles and user flows",
      "Experience designing responsive interfaces",
      "Ability to work closely with engineers and iterate quickly",
      "Strong attention to detail and visual consistency",
    ],
    niceToHave: [
      "Experience with Web3 or crypto products",
      "Understanding of wallets, transactions, or blockchain UX patterns",
      "Experience designing fintech or marketplace products",
      "Familiarity with Figma",
    ],
    techStack: ["React / Next.js", "Node.js", "Ethereum + L2", "Solidity", "IPFS + off-chain systems"],
    whyThisRole: [
      "High ownership of product design direction",
      "Early-stage equity / token upside",
      "Direct collaboration with founders and engineers",
      "Real impact on how the product feels and works",
    ],
    howToApply: ["Portfolio (must include product/UI work)", "Case studies or projects you've worked on", "Short note on your experience designing complex products"],
  },
  {
    title: "UX/UI Designer",
    category: "Design",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/UX-UI-Designer-34203938ce4280babb19e255cb2ab0ae",
    description: "You'll be responsible for designing the full user experience of the platform.",
    responsibilities: [
      "Designing end-to-end user flows",
      "Creating clean, simple interfaces for complex Web3 interactions",
      "Turning product ideas into wireframes, mockups, and prototypes",
      "Working closely with frontend and product teams",
      "Improving UX for blockchain actions",
      "Building and maintaining a consistent design system",
      "Simplifying complex financial and blockchain processes into intuitive UX",
    ],
    requirements: [
      "Strong experience in UX/UI or product design",
      "Portfolio showing web or product design work",
      "Strong understanding of user flows and interaction design",
      "Ability to simplify complex systems into clean interfaces",
      "Experience working closely with developers",
    ],
    niceToHave: [
      "Experience with Web3 or crypto products",
      "Understanding of wallets, transactions, and blockchain UX patterns",
      "Experience in fintech or marketplace design",
      "Familiarity with Figma",
    ],
    techStack: ["React / Next.js", "Node.js", "Ethereum + L2", "Solidity", "IPFS + off-chain systems"],
    whyThisRole: [
      "High ownership of product design direction",
      "Early-stage equity / token upside",
      "Direct collaboration with founders and engineers",
      "Real impact on how the product is experienced",
    ],
    howToApply: ["Portfolio (must include UX/UI or product design work)", "Case studies or relevant projects", "Short note on your experience designing complex products or Web3/fintech apps"],
  },
  {
    title: "Graphic Designer",
    category: "Design",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Graphic-Designer-34203938ce42809dba36c203f47fa174",
    description: "You'll be responsible for shaping the visual identity of RWAHub across product and brand.",
    responsibilities: [
      "Designing visual assets for web and product interfaces",
      "Creating marketing materials (social media, landing pages, pitch decks)",
      "Helping define and evolve the brand identity",
      "Supporting UI design work in collaboration with product designers",
      "Creating illustrations, icons, and visual systems",
      "Making complex Web3 concepts visually simple and appealing",
    ],
    requirements: [
      "Strong experience in graphic design or visual design",
      "Portfolio showing brand, digital, or product-related design work",
      "Strong sense of typography, color, and layout",
      "Ability to create clean and modern visual systems",
      "Comfortable working with product and marketing teams",
    ],
    niceToHave: [
      "Experience with Web3, fintech, or tech startups",
      "Experience designing for SaaS or digital products",
      "Motion design or animation skills",
      "Experience creating pitch decks or investor materials",
    ],
    techStack: ["React / Next.js", "Node.js", "Ethereum + L2", "Solidity", "IPFS + off-chain systems"],
    whyThisRole: [
      "High ownership over brand and visual direction",
      "Early-stage equity / token upside",
      "Direct collaboration with founders and product team",
      "Real impact on how the product is perceived",
    ],
    howToApply: ["Portfolio (must include visual or brand design work)", "Relevant projects or campaigns", "Short note on your experience with branding or product-related design"],
  },
  {
    title: "Business Analyst",
    category: "Operations",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Business-Analyst-34203938ce4280bb906fd90fc84a9c22",
    description: "You'll sit between product, engineering, and business — helping make sure everyone is aligned on what we're building and why.",
    responsibilities: [
      "Gathering and documenting business and product requirements",
      "Translating ideas into clear functional specifications",
      "Working with founders to structure product roadmap and priorities",
      "Defining workflows for marketplace operations",
      "Supporting frontend, backend, and blockchain teams with clear requirements",
      "Identifying gaps, inconsistencies, and edge cases in product logic",
    ],
    requirements: [
      "Experience as a Business Analyst, Product Analyst, or similar role",
      "Strong ability to break down complex systems into structured requirements",
      "Good communication skills with both technical and non-technical teams",
      "Experience working with product and engineering teams",
      "Ability to think in workflows, edge cases, and system logic",
    ],
    niceToHave: [
      "Experience in Web3, fintech, or marketplace products",
      "Understanding of blockchain basics",
      "Familiarity with agile development processes",
      "Experience writing user stories, PRDs, or technical specs",
    ],
    techStack: ["React / Next.js", "Node.js", "Ethereum + L2", "Solidity", "IPFS + off-chain systems"],
    whyThisRole: [
      "High ownership over product structure and clarity",
      "Early-stage equity / token upside",
      "Direct collaboration with founders and engineers",
      "Real impact on how the platform is designed and built",
    ],
    howToApply: ["CV / LinkedIn", "Examples of requirements, specs, or product documentation", "Short note on your experience working between business, product, and engineering teams"],
  },
  {
    title: "Data Analyst",
    category: "Operations",
    location: "Remote (Global)",
    type: "Full-time / Part-time",
    notionUrl: "https://www.notion.so/Data-Analyst-34203938ce4280f28e99f51f9a28babd",
    description: "You'll help us understand what's happening in the product and turn raw data into actionable insights.",
    responsibilities: [
      "Analyzing user behavior across the platform",
      "Tracking marketplace activity (listings, transactions, liquidity flows)",
      "Defining and maintaining key product and business metrics",
      "Working with product and engineering teams to set up event tracking",
      "Building dashboards and reports for founders and the team",
      "Identifying trends, bottlenecks, and user drop-off points",
    ],
    requirements: [
      "Experience as a Data Analyst or similar role",
      "Strong skills in SQL and data querying",
      "Experience working with product or user data",
      "Ability to turn raw data into clear insights and recommendations",
      "Familiarity with dashboards and visualization tools",
    ],
    niceToHave: [
      "Experience in Web3, fintech, or marketplace products",
      "Understanding of blockchain data (wallet activity, transactions, events)",
      "Experience with tools like Mixpanel, Amplitude, PostHog",
      "Familiarity with Python or data scripting",
    ],
    techStack: ["React / Next.js", "Node.js", "Ethereum + L2", "Solidity", "IPFS + off-chain databases"],
    whyThisRole: [
      "High ownership over product and growth insights",
      "Early-stage equity / token upside",
      "Direct access to founders and engineering team",
      "Real impact on product and protocol decisions",
    ],
    howToApply: ["CV / LinkedIn", "Examples of dashboards, analysis, or insights you've delivered", "Short note on your experience working with product or user data"],
  },
];

const categories = ["All", "Engineering", "Product", "Design", "Operations"];

function JobCard({ job }: { job: JobPosition }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {job.category}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
              {job.type}
            </span>
          </div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-1">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              Early MVP Stage
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{job.description}</p>
        </div>
        <div className="mt-1 text-muted-foreground shrink-0">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6 border-t border-border pt-6">
              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">What you'll do</h4>
                <ul className="space-y-1.5">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">What we're looking for</h4>
                <ul className="space-y-1.5">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">Nice to have</h4>
                <ul className="space-y-1.5">
                  {job.niceToHave.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1 shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {job.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">Why this role</h4>
                <ul className="space-y-1.5">
                  {job.whyThisRole.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">Compensation</h4>
                <p className="text-sm text-muted-foreground">Flexible (depending on experience) · Equity / token allocation · Remote-first setup</p>
              </div>

              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">How to apply</h4>
                <ul className="space-y-1.5 mb-4">
                  {job.howToApply.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/apply"
                  search={{ position: job.title }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Apply Now <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HiringPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredJobs =
    selectedCategory === "All"
      ? jobs
      : jobs.filter((job) => job.category === selectedCategory);

  return (
    <PageLayout>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="We're Hiring"
            title="Join the Team Building the"
            highlight="Future of RWA"
            description="RWAHub is building a decentralized marketplace for real-world assets. We're looking for talented people to join us early and shape the next generation of asset ownership."
          />

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({jobs.filter((j) => j.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.title} job={job} />
            ))}
          </div>

          <div className="mt-16 text-center p-8 rounded-xl bg-card border border-border">
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              Don't see your role?
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              We're always looking for talented people. Send your CV and a short intro to us.
            </p>
            <a
              href="https://www.linkedin.com/company/rwahub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Connect on LinkedIn <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
