import {
  Code2,
  Smartphone,
  Palette,
  ShoppingBag,
  Settings2,
  Brain,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
};

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description: "Fast, scalable, SEO-ready marketing sites and web apps with modern stacks.",
    icon: Code2,
    color: "#ff7a00",
    bg: "#fff1de",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "Native-feel iOS and Android apps powered by React Native and Swift.",
    icon: Smartphone,
    color: "#118ab2",
    bg: "#e0f2f8",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Beautiful, intuitive product experiences crafted by senior designers.",
    icon: Palette,
    color: "#ef476f",
    bg: "#fde4ec",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    description: "Shopify, headless and custom commerce that converts visitors into buyers.",
    icon: ShoppingBag,
    color: "#06d6a0",
    bg: "#daf7ee",
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    description: "Internal tools, dashboards and SaaS platforms built for scale and security.",
    icon: Settings2,
    color: "#ffd166",
    bg: "#fff4d6",
  },
  {
    slug: "ai-automation",
    title: "AI & Automation Solutions",
    description: "LLM-powered features, workflow automation and intelligent integrations.",
    icon: Brain,
    color: "#7c3aed",
    bg: "#ede4fe",
  },
];

export type Project = {
  slug: string;
  title: string;
  client: string;
  description: string;
  longDescription: string;
  category: "Web" | "UI/UX" | "E-commerce" | "Dashboard" | "SaaS" | "Mobile App";
  featured: boolean;
  stack: string[];
  results: { label: string; value: string }[];
  gradient: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "lumen-analytics",
    title: "Lumen Analytics",
    client: "Lumen Inc.",
    description: "A bright real-time analytics platform for SaaS teams.",
    longDescription:
      "We rebuilt Lumen's analytics dashboard from scratch — a real-time multi-tenant platform serving 4M events per day with sub-second insights. Designed for speed, clarity and joy.",
    category: "Dashboard",
    featured: true,
    stack: ["Next.js", "TypeScript", "Postgres", "ClickHouse", "Tailwind"],
    results: [
      { label: "Faster TTI", value: "3.4x" },
      { label: "Activation", value: "+62%" },
      { label: "NPS", value: "71" },
    ],
    gradient: "from-[#ff7a00] via-[#ffd166] to-[#06d6a0]",
  },
  {
    slug: "orbit-commerce",
    title: "Orbit Commerce",
    client: "Orbit Goods",
    description: "Headless storefront for a modern lifestyle brand.",
    longDescription:
      "A custom Shopify Hydrogen storefront with editorial storytelling, AR try-on and a lightning-fast checkout flow that lifted conversion by 38%.",
    category: "E-commerce",
    featured: true,
    stack: ["Hydrogen", "Shopify", "Sanity", "Framer Motion"],
    results: [
      { label: "Conversion", value: "+38%" },
      { label: "LCP", value: "1.1s" },
      { label: "AOV", value: "+21%" },
    ],
    gradient: "from-[#ef476f] via-[#ff7a00] to-[#ffd166]",
  },
  {
    slug: "northwind-banking",
    title: "Northwind Banking",
    client: "Northwind Bank",
    description: "Mobile-first banking experience for Gen-Z customers.",
    longDescription:
      "A consumer banking app for a digital-first bank. We designed and shipped onboarding, payments, cards and savings goals — built with React Native and a typed GraphQL layer.",
    category: "Mobile App",
    featured: true,
    stack: ["React Native", "GraphQL", "Node", "Postgres"],
    results: [
      { label: "Onboarding", value: "92%" },
      { label: "Crash-free", value: "99.8%" },
      { label: "Rating", value: "4.9★" },
    ],
    gradient: "from-[#118ab2] via-[#06d6a0] to-[#ffd166]",
  },
  {
    slug: "atlas-edu",
    title: "Atlas Edu",
    client: "Atlas Learning",
    description: "An LMS for the next generation of online learners.",
    longDescription:
      "A learning platform with adaptive lesson plans, live cohorts and AI-powered tutoring. Built for scale with a multi-region edge architecture.",
    category: "SaaS",
    featured: false,
    stack: ["Next.js", "tRPC", "Drizzle", "Postgres"],
    results: [
      { label: "Course completion", value: "+47%" },
      { label: "Active learners", value: "120k" },
      { label: "Uptime", value: "99.99%" },
    ],
    gradient: "from-[#06d6a0] via-[#118ab2] to-[#ef476f]",
  },
  {
    slug: "harvest-os",
    title: "Harvest OS",
    client: "Harvest Co-op",
    description: "Operations OS for modern agriculture cooperatives.",
    longDescription:
      "An internal operations platform helping co-ops manage 14k farmers — from inventory to payouts. Replaced 7 spreadsheets and 3 legacy tools.",
    category: "Web",
    featured: false,
    stack: ["Remix", "Postgres", "Prisma", "Tailwind"],
    results: [
      { label: "Time saved", value: "32 hrs/wk" },
      { label: "Errors", value: "-84%" },
      { label: "Adoption", value: "100%" },
    ],
    gradient: "from-[#ffd166] via-[#06d6a0] to-[#118ab2]",
  },
  {
    slug: "vista-realty",
    title: "Vista Realty",
    client: "Vista Properties",
    description: "Luxury real estate marketplace with 3D tours.",
    longDescription:
      "A premium real estate marketplace with 3D property tours, smart filters and instant agent chat. Designed to feel as polished as the homes it lists.",
    category: "UI/UX",
    featured: false,
    stack: ["Next.js", "Three.js", "Mapbox", "Stripe"],
    results: [
      { label: "Leads", value: "+2.4x" },
      { label: "Avg session", value: "6m 12s" },
      { label: "Bounce", value: "-41%" },
    ],
    gradient: "from-[#ef476f] via-[#ffd166] to-[#06d6a0]",
  },
];

export const INDUSTRIES = [
  { name: "E-commerce", bg: "#fff4d6", color: "#b35a00" },
  { name: "Education", bg: "#daf7ee", color: "#047857" },
  { name: "Healthcare", bg: "#e0f2f8", color: "#0e6c8e" },
  { name: "Real Estate", bg: "#fde4ec", color: "#b8284f" },
  { name: "Finance", bg: "#fff1de", color: "#b35a00" },
  { name: "Travel", bg: "#e0f2f8", color: "#0e6c8e" },
  { name: "Agriculture", bg: "#daf7ee", color: "#047857" },
  { name: "SaaS", bg: "#ede4fe", color: "#5b21b6" },
  { name: "Local Businesses", bg: "#fff4d6", color: "#b35a00" },
];

export const PROCESS = [
  { step: "01", title: "Discover", desc: "We dig into your business, audience and goals to align on outcomes." },
  { step: "02", title: "Design", desc: "Wireframes, prototypes and a complete design system — fast." },
  { step: "03", title: "Develop", desc: "Production-grade engineering with modern stacks and clean code." },
  { step: "04", title: "Test", desc: "QA across devices, performance budgets and accessibility audits." },
  { step: "05", title: "Launch", desc: "Smooth release, analytics setup and ongoing iteration support." },
];

export const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Most websites ship in 4–8 weeks. Web apps and dashboards typically range from 8–16 weeks depending on scope. We share a clear timeline after our first discovery call.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Absolutely. A large part of our work is partnering with founders to ship their MVP or v2. We're startup-friendly and pragmatic about scope.",
  },
  {
    q: "What's your pricing model?",
    a: "We offer fixed-scope projects, monthly retainers and product-as-a-service engagements. We'll recommend the right model after understanding your goals.",
  },
  {
    q: "Can you redesign an existing product?",
    a: "Yes — redesigns are one of our specialties. We can refresh your brand, modernize your UI or rebuild on a new stack without disrupting your business.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. We offer maintenance, growth experiments and incremental feature work through a flexible retainer.",
  },
  {
    q: "Which technologies do you use?",
    a: "We work with React, Next.js, React Native, TypeScript, Node, Postgres, Shopify, and various AI/LLM platforms. We pick the right tool for each project.",
  },
];
