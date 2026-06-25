import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { Blobs } from "@/components/site/Blobs";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { INDUSTRIES } from "@/lib/site-data";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Solaris Studio" },
      {
        name: "description",
        content: "Solaris partners with teams across 9 industries — from SaaS and finance to agriculture and local businesses.",
      },
      { property: "og:title", content: "Industries — Solaris Studio" },
      { property: "og:description", content: "Industries we serve and how we approach each." },
    ],
  }),
  component: IndustriesPage,
});

const DETAILS: Record<string, string> = {
  "E-commerce": "Storefronts, headless commerce, checkout optimization and merchandising tools.",
  Education: "LMS platforms, cohort-based learning tools and adaptive learning experiences.",
  Healthcare: "HIPAA-conscious patient portals, telehealth and clinician dashboards.",
  "Real Estate": "Marketplaces, agent tools, 3D tours and lead-gen experiences.",
  Finance: "Consumer fintech, dashboards, KYC flows and back-office tools.",
  Travel: "Booking experiences, itineraries, destination guides and loyalty programs.",
  Agriculture: "Operations OS, supply chain tools and farmer-facing mobile apps.",
  SaaS: "Multi-tenant platforms, analytics, admin tooling and growth experiments.",
  "Local Businesses": "High-converting websites, online ordering and booking systems.",
};

function IndustriesPage() {
  return (
    <Layout>
      <section className="relative pt-36 pb-16">
        <Blobs variant="hero" />
        <div className="container-x relative text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff7e6] border border-[#f2e8d8] text-xs font-semibold uppercase tracking-wider text-[#ff7a00]">
              Industries
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] text-[#101828]">
              Domains we know <span className="text-gradient">well</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-[#475467] max-w-2xl mx-auto">
              We've shipped products across nine industries. We bring proven patterns — and avoid
              the pitfalls — for each.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.04}>
              <div
                className="h-full rounded-[24px] p-7 border hover:-translate-y-1 transition-transform"
                style={{ background: ind.bg, borderColor: `${ind.color}25` }}
              >
                <div
                  className="inline-flex h-10 w-10 rounded-xl items-center justify-center font-display font-bold"
                  style={{ background: ind.color, color: "white" }}
                >
                  {ind.name.charAt(0)}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold" style={{ color: ind.color }}>
                  {ind.name}
                </h3>
                <p className="mt-2 text-sm text-[#475467] leading-relaxed">{DETAILS[ind.name]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="rounded-[32px] bg-gradient-cta text-white p-10 md:p-16 text-center">
            <SectionHeading
              eyebrow="Don't see your industry?"
              title={<span className="text-white">We learn fast. <span className="opacity-80">Let's chat.</span></span>}
            />
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#101828] font-semibold"
            >
              Book a call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
