import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { Blobs } from "@/components/site/Blobs";
import { Reveal } from "@/components/site/Reveal";
import { PROJECTS } from "@/lib/site-data";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Solaris Studio" },
      {
        name: "description",
        content: "A selection of products we've shipped — SaaS dashboards, mobile apps, storefronts and custom platforms.",
      },
      { property: "og:title", content: "Work — Solaris Studio" },
      { property: "og:description", content: "Recent products from the Solaris team." },
    ],
  }),
  component: WorkPage,
});

const CATEGORIES = ["All", "Featured", "Web", "UI/UX", "E-commerce", "Dashboard", "SaaS", "Mobile App"] as const;
type Cat = (typeof CATEGORIES)[number];

function WorkPage() {
  const [filter, setFilter] = useState<Cat>("All");

  const projects = useMemo(() => {
    if (filter === "All") return PROJECTS;
    if (filter === "Featured") return PROJECTS.filter((p) => p.featured);
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <Layout>
      <section className="relative pt-36 pb-12">
        <Blobs variant="hero" />
        <div className="container-x relative text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff7e6] border border-[#f2e8d8] text-xs font-semibold uppercase tracking-wider text-[#ff7a00]">
              Portfolio
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] text-[#101828]">
              Products we've <span className="text-gradient">shipped</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-[#475467] max-w-2xl mx-auto">
              A handful of recent projects we love. Click into any case study to see the process,
              decisions and results.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-10">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    active
                      ? "bg-gradient-cta text-white border-transparent shadow-soft"
                      : "bg-white text-[#475467] border-[#f2e8d8] hover:text-[#101828]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {projects.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className="group block h-full rounded-[28px] overflow-hidden bg-white border border-[#f2e8d8] shadow-card hover:shadow-glow hover:-translate-y-1 transition-all"
                  >
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                      <div className="absolute inset-0 grid-pattern opacity-25" />
                      <div className="absolute inset-0 grid place-items-center text-white font-display text-2xl font-bold drop-shadow-lg">
                        {p.client}
                      </div>
                      <div className="absolute inset-0 bg-[#101828]/0 group-hover:bg-[#101828]/30 transition-colors" />
                    </div>
                    <div className="p-6">
                      <span className="px-3 py-1 rounded-full bg-[#fff7e6] text-[#ff7a00] text-xs font-semibold">
                        {p.category}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-bold text-[#101828]">{p.title}</h3>
                      <p className="mt-2 text-sm text-[#475467]">{p.description}</p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full bg-[#fffdf7] border border-[#f2e8d8] text-xs text-[#475467]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ff7a00]">
                        View Case Study
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
