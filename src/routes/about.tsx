import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Rocket, ShieldCheck, Wand2 } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { Blobs } from "@/components/site/Blobs";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Solaris Studio" },
      {
        name: "description",
        content:
          "Solaris is a small senior team of designers, engineers and product thinkers shipping bright, future-ready products.",
      },
      { property: "og:title", content: "About — Solaris Studio" },
      { property: "og:description", content: "Senior designers, engineers and product thinkers." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const values = [
    { icon: Heart, title: "Care", desc: "We take ownership like founders do." },
    { icon: Rocket, title: "Velocity", desc: "Momentum compounds. We ship every week." },
    { icon: ShieldCheck, title: "Craft", desc: "Production-grade by default, never sloppy." },
    { icon: Wand2, title: "Curiosity", desc: "We poke at the new so you don't have to." },
  ];

  const team = [
    { name: "Maya Chen", role: "Founder & Design Director", color: "#ff7a00" },
    { name: "Ben Okafor", role: "Engineering Lead", color: "#118ab2" },
    { name: "Riya Singh", role: "Product Strategist", color: "#06d6a0" },
    { name: "Felix Hart", role: "Senior Engineer", color: "#ef476f" },
    { name: "Noa Bauer", role: "Senior Designer", color: "#ffd166" },
    { name: "Sora Tanaka", role: "Motion & 3D", color: "#7c3aed" },
  ];

  return (
    <Layout>
      <section className="relative pt-36 pb-20">
        <Blobs variant="hero" />
        <div className="container-x relative text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff7e6] border border-[#f2e8d8] text-xs font-semibold uppercase tracking-wider text-[#ff7a00]">
              About Solaris
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] text-[#101828]">
              A studio building <span className="text-gradient">bright futures</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-[#475467] max-w-2xl mx-auto">
              We're a small senior team that partners with founders and product leaders to design,
              build and grow modern digital products.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title={<>Started small. <span className="text-gradient">Stayed sharp.</span></>}
            />
            <div className="mt-6 space-y-4 text-[#475467] leading-relaxed">
              <p>
                Solaris started in 2017 as a two-person studio with one goal: do excellent work for
                people we believe in. Eight years later, we're a tight team of 12 — and we still
                hand-pick every project.
              </p>
              <p>
                We've shipped products with venture-backed startups, public-company innovation teams
                and bootstrapped founders alike. The thread between them is ambition and care.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl p-6 bg-white border border-[#f2e8d8] shadow-card"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-brand grid place-items-center text-white">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 font-display text-lg font-bold text-[#101828]">{v.title}</div>
                  <p className="mt-1 text-sm text-[#475467]">{v.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-[#fff7e6] border-y border-[#f2e8d8]">
        <div className="container-x">
          <SectionHeading
            eyebrow="The team"
            title={<>The humans behind the <span className="text-gradient">pixels</span></>}
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <div className="rounded-3xl p-6 bg-white border border-[#f2e8d8] shadow-card hover:-translate-y-1 transition-transform">
                  <div
                    className="aspect-square rounded-2xl mb-5"
                    style={{
                      background: `linear-gradient(135deg, ${m.color} 0%, #ffd166 100%)`,
                    }}
                  />
                  <div className="font-display text-xl font-bold text-[#101828]">{m.name}</div>
                  <div className="text-sm text-[#475467]">{m.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <div className="rounded-[32px] bg-[#101828] text-white p-10 md:p-16 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Want to work <span className="text-gradient">with us?</span>
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">
              We take on a handful of new projects each quarter. Let's see if we're a fit.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-cta text-white font-semibold"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
