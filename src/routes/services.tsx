import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { Blobs } from "@/components/site/Blobs";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Solaris Studio" },
      {
        name: "description",
        content:
          "Web development, mobile apps, UI/UX design, e-commerce, custom software and AI automation — under one roof.",
      },
      { property: "og:title", content: "Services — Solaris Studio" },
      { property: "og:description", content: "End-to-end product expertise for ambitious teams." },
    ],
  }),
  component: ServicesPage,
});

const BENEFITS: Record<string, string[]> = {
  "web-development": ["Marketing sites", "Web apps", "Headless CMS", "SEO & performance"],
  "mobile-app-development": ["iOS & Android", "React Native", "Push & analytics", "App Store launch"],
  "ui-ux-design": ["Design systems", "Prototypes", "User research", "Brand identity"],
  "ecommerce-development": ["Shopify Hydrogen", "Custom commerce", "Checkout UX", "Conversion audits"],
  "custom-software": ["Internal tools", "SaaS platforms", "Dashboards", "Integrations"],
  "ai-automation": ["LLM features", "RAG pipelines", "Agents", "Workflow automation"],
};

function ServicesPage() {
  return (
    <Layout>
      <section className="relative pt-36 pb-20 overflow-hidden">
        <Blobs variant="hero" />
        <div className="container-x relative text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff7e6] border border-[#f2e8d8] text-xs font-semibold uppercase tracking-wider text-[#ff7a00]">
              Services
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] text-[#101828]">
              Everything you need to <span className="text-gradient">ship</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-[#475467] max-w-2xl mx-auto">
              Pick a service or hire us as a full embedded product team. Senior people on every
              project, no juniors hiding in the back.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <div className="group h-full rounded-[28px] bg-white border border-[#f2e8d8] p-8 shadow-card hover:shadow-glow hover:-translate-y-1 transition-all">
                <div className="flex items-start gap-5">
                  <div
                    className="h-14 w-14 rounded-2xl grid place-items-center group-hover:rotate-6 transition-transform shrink-0"
                    style={{ background: s.bg }}
                  >
                    <s.icon className="h-6 w-6" style={{ color: s.color }} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#101828]">{s.title}</h3>
                    <p className="mt-2 text-[#475467] leading-relaxed">{s.description}</p>
                  </div>
                </div>
                <ul className="mt-6 grid grid-cols-2 gap-2">
                  {BENEFITS[s.slug].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-[#101828]">
                      <span className="h-5 w-5 rounded-full bg-[#daf7ee] grid place-items-center">
                        <Check className="h-3 w-3 text-[#06d6a0]" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#ff7a00]"
                >
                  Discuss this service <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Engagement models"
            title={<>Flexible ways to <span className="text-gradient">work together</span></>}
          />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { title: "Fixed Scope", desc: "Defined deliverables, clear timeline. Best for marketing sites and small apps.", color: "#ff7a00" },
              { title: "Embedded Team", desc: "We act as your product team. Best for startups scaling fast.", color: "#06d6a0" },
              { title: "Product Retainer", desc: "Monthly capacity for design + engineering. Best for ongoing iteration.", color: "#118ab2" },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <div className="rounded-3xl p-8 bg-white border border-[#f2e8d8] shadow-card h-full">
                  <div
                    className="h-2 w-12 rounded-full mb-6"
                    style={{ background: m.color }}
                  />
                  <h3 className="font-display text-xl font-bold text-[#101828]">{m.title}</h3>
                  <p className="mt-3 text-[#475467]">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
