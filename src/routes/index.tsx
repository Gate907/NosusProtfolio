import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Star,
  Plus,
  Minus,
  Rocket,
  ShieldCheck,
  Gauge,
  Target,
  Wand2,
  Heart,
} from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { Blobs } from "@/components/site/Blobs";
import { HeroVisual } from "@/components/site/HeroVisual";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES, PROJECTS, INDUSTRIES, PROCESS, FAQS } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solaris — Bright, fast, future-ready digital products" },
      {
        name: "description",
        content:
          "Solaris is a creative digital product studio. We design and build websites, apps, dashboards and custom software for startups and growing businesses.",
      },
      { property: "og:title", content: "Solaris — Creative Digital Product Studio" },
      {
        property: "og:description",
        content: "Bright, fast, future-ready digital products for ambitious teams.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <Layout>
      <Hero />
      <Marquee />
      <WhoWeAre />
      <Stats />
      <ServicesPreview />
      <FeaturedWork />
      <ProcessTimeline />
      <IndustriesGrid />
      <WhyChooseUs />
      <FAQ />
      <FinalCTA />
    </Layout>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <Blobs variant="hero" />
      </motion.div>

      <div className="container-x relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#f2e8d8] text-xs font-semibold uppercase tracking-wider text-[#ff7a00]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Creative Digital Product Studio
            </motion.span>

            <h1 className="mt-6 font-display text-[42px] leading-[1.05] sm:text-[56px] lg:text-[78px] font-bold text-[#101828]">
              {["We Build Digital", "Products That Feel", "Bright, Fast &"].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="block text-gradient"
              >
                Future-Ready.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-6 text-lg text-[#475467] max-w-xl leading-relaxed"
            >
              We design and develop websites, apps, dashboards and custom software experiences for
              startups and growing businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#101828] text-white font-semibold shadow-soft hover:-translate-y-0.5 transition-all"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-cta text-white font-semibold shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all"
              >
                Get Free Consultation
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-10 flex items-center gap-5 text-sm text-[#475467]"
            >
              <div className="flex -space-x-2">
                {["#ff7a00", "#ffd166", "#06d6a0", "#118ab2"].map((c) => (
                  <div
                    key={c}
                    className="h-9 w-9 rounded-full border-2 border-white"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#ffd166] text-[#ffd166]" />
                ))}
                <span className="ml-2 font-semibold text-[#101828]">5.0</span>
                <span>· 80+ happy clients</span>
              </div>
            </motion.div>
          </div>

          <motion.div style={{ y: yVisual }}>
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "E-commerce",
    "Custom Software",
    "AI & Automation",
    "SaaS Platforms",
    "Brand Systems",
  ];
  const row = [...items, ...items];
  return (
    <section className="py-10 border-y border-[#f2e8d8] bg-white overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {row.map((item, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="font-display text-2xl md:text-3xl font-bold text-[#101828]/80">
              {item}
            </span>
            <span className="ml-8 h-2.5 w-2.5 rounded-full bg-gradient-brand" />
          </div>
        ))}
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Blobs variant="soft" />
      <div className="container-x relative grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff7e6] border border-[#f2e8d8] text-xs font-semibold uppercase tracking-wider text-[#ff7a00]">
            Who we are
          </span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold leading-tight text-[#101828]">
            A small studio that ships <span className="text-gradient">big ideas</span>.
          </h2>
          <p className="mt-5 text-lg text-[#475467] leading-relaxed">
            Solaris is a team of designers, engineers and product thinkers who love turning
            ambitious ideas into bright, polished products. We work shoulder-to-shoulder with
            founders and product teams from first sketch to launch — and beyond.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: Rocket, label: "Ship in weeks, not quarters" },
              { icon: Heart, label: "Senior team, no juniors" },
              { icon: ShieldCheck, label: "Production-grade quality" },
              { icon: Wand2, label: "Design + engineering" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#f2e8d8]"
              >
                <div className="h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-[#101828]">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-8 rounded-[40px] bg-gradient-brand opacity-20 blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="rounded-3xl p-6 bg-white border border-[#f2e8d8] shadow-card">
                <div className="font-display text-5xl font-bold text-gradient">8+</div>
                <div className="mt-2 text-sm text-[#475467]">Years building products</div>
              </div>
              <div className="rounded-3xl p-6 bg-[#fff7e6] border border-[#f2e8d8]">
                <div className="font-display text-5xl font-bold text-[#ff7a00]">12</div>
                <div className="mt-2 text-sm text-[#475467]">Senior product folks</div>
              </div>
              <div className="rounded-3xl p-6 bg-[#daf7ee] border border-[#06d6a0]/20">
                <div className="font-display text-5xl font-bold text-[#06d6a0]">120+</div>
                <div className="mt-2 text-sm text-[#475467]">Products shipped</div>
              </div>
              <div className="rounded-3xl p-6 bg-[#e0f2f8] border border-[#118ab2]/20">
                <div className="font-display text-5xl font-bold text-[#118ab2]">22</div>
                <div className="mt-2 text-sm text-[#475467]">Industry awards</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "120+", label: "Products shipped", color: "#ff7a00" },
    { value: "38%", label: "Avg conversion lift", color: "#06d6a0" },
    { value: "4.9/5", label: "Client rating", color: "#ffd166" },
    { value: "14", label: "Countries served", color: "#118ab2" },
  ];
  return (
    <section className="py-12">
      <div className="container-x">
        <div className="rounded-[32px] bg-gradient-brand p-1 shadow-glow">
          <div className="rounded-[28px] bg-white grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="p-8 text-center bg-white">
                  <div
                    className="font-display text-4xl md:text-5xl font-bold"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm text-[#475467]">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title={<>End-to-end product <span className="text-gradient">expertise</span></>}
          description="From the first sketch to a scaling product. Pick a single service or hire us as your full product team."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <div className="group relative h-full rounded-[28px] bg-white border border-[#f2e8d8] p-7 shadow-card hover:shadow-glow transition-all hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                <div
                  className="h-14 w-14 rounded-2xl grid place-items-center group-hover:rotate-6 transition-transform"
                  style={{ background: s.bg }}
                >
                  <s.icon className="h-6 w-6" style={{ color: s.color }} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-[#101828]">{s.title}</h3>
                <p className="mt-3 text-[#475467] leading-relaxed">{s.description}</p>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ff7a00] group/link"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  const featured = PROJECTS.filter((p) => p.featured);
  return (
    <section className="relative py-24 md:py-32 bg-[#fff7e6] border-y border-[#f2e8d8] overflow-hidden">
      <div className="container-x">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <SectionHeading
            align="left"
            eyebrow="Featured work"
            title={<>Recent products we're <span className="text-gradient">proud of</span></>}
          />
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#f2e8d8] text-sm font-semibold text-[#101828] hover:bg-[#101828] hover:text-white transition-all"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-8">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group block relative rounded-[28px] overflow-hidden bg-white border border-[#f2e8d8] shadow-card hover:shadow-glow transition-all"
              >
                <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-white/95 font-display text-3xl font-bold drop-shadow-lg">
                      {p.client}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[#101828]/0 group-hover:bg-[#101828]/30 transition-colors" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <span className="px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-[#101828]">
                      View case study
                    </span>
                    <span className="h-10 w-10 rounded-full bg-white grid place-items-center">
                      <ArrowRight className="h-5 w-5 text-[#101828]" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#fff7e6] text-[#ff7a00] text-xs font-semibold">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-[#101828]">{p.title}</h3>
                  <p className="mt-2 text-[#475467]">{p.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we work"
          title={<>A simple <span className="text-gradient">5-step</span> process</>}
          description="No black boxes. You're involved at every step — from kickoff to launch."
        />

        <div ref={ref} className="mt-20 relative max-w-4xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-[#f2e8d8] rounded-full" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-1 -translate-x-1/2 bg-gradient-brand rounded-full"
          />

          <div className="space-y-12">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div
                  className={`relative flex items-start gap-6 md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`hidden md:block flex-1 ${
                      i % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    {i % 2 === 0 && <ProcessCard p={p} />}
                  </div>

                  <div className="relative z-10 h-16 w-16 shrink-0 rounded-2xl bg-white border-2 border-[#f2e8d8] shadow-card grid place-items-center">
                    <span className="font-display text-xl font-bold text-gradient">{p.step}</span>
                  </div>

                  <div className="flex-1 md:hidden">
                    <ProcessCard p={p} />
                  </div>
                  <div className="hidden md:block flex-1">
                    {i % 2 !== 0 && <ProcessCard p={p} />}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ p }: { p: { title: string; desc: string } }) {
  return (
    <div className="inline-block text-left rounded-2xl p-6 bg-white border border-[#f2e8d8] shadow-card max-w-md">
      <h3 className="font-display text-xl font-bold text-[#101828]">{p.title}</h3>
      <p className="mt-2 text-[#475467]">{p.desc}</p>
    </div>
  );
}

function IndustriesGrid() {
  return (
    <section className="py-24 md:py-32 bg-[#fff7e6] border-y border-[#f2e8d8]">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industries we serve"
          title={<>Trusted across <span className="text-gradient">9 industries</span></>}
          description="From early-stage startups to established teams in regulated industries."
        />
        <div className="mt-14 flex flex-wrap justify-center gap-3 md:gap-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.03}>
              <div
                className="px-6 py-4 rounded-2xl border font-semibold text-base md:text-lg hover:-translate-y-1 transition-transform"
                style={{ background: ind.bg, color: ind.color, borderColor: `${ind.color}20` }}
              >
                {ind.name}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    { icon: Wand2, title: "Creative Design", desc: "Distinctive, on-brand interfaces — never templated.", color: "#ef476f", bg: "#fde4ec" },
    { icon: Rocket, title: "Scalable Structure", desc: "Architecture built to grow with you for years.", color: "#ff7a00", bg: "#fff1de" },
    { icon: Gauge, title: "Performance First", desc: "Sub-second loads. Lighthouse scores above 95.", color: "#06d6a0", bg: "#daf7ee" },
    { icon: Target, title: "Conversion Focused", desc: "Designed and tested to move your business metrics.", color: "#118ab2", bg: "#e0f2f8" },
    { icon: Sparkles, title: "Modern Animations", desc: "Polished motion that makes products feel alive.", color: "#ffd166", bg: "#fff4d6" },
    { icon: Heart, title: "Startup Friendly", desc: "Flexible scope, fair pricing, founder energy.", color: "#7c3aed", bg: "#ede4fe" },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why choose us"
          title={<>Built for ambitious teams that <span className="text-gradient">care</span></>}
        />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05}>
              <div className="group h-full rounded-[24px] p-6 bg-white border border-[#f2e8d8] shadow-card hover:shadow-glow hover:-translate-y-1 transition-all">
                <div
                  className="h-12 w-12 rounded-xl grid place-items-center group-hover:scale-110 transition-transform"
                  style={{ background: it.bg }}
                >
                  <it.icon className="h-5 w-5" style={{ color: it.color }} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-[#101828]">{it.title}</h3>
                <p className="mt-2 text-sm text-[#475467] leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32 bg-[#fff7e6] border-y border-[#f2e8d8]">
      <div className="container-x max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Questions, <span className="text-gradient">answered</span></>}
        />
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const active = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="rounded-2xl bg-white border border-[#f2e8d8] overflow-hidden">
                  <button
                    onClick={() => setOpen(active ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-display font-semibold text-lg text-[#101828]">{f.q}</span>
                    <span
                      className={`h-9 w-9 rounded-full grid place-items-center transition-all ${
                        active ? "bg-gradient-cta text-white rotate-180" : "bg-[#fff7e6] text-[#ff7a00]"
                      }`}
                    >
                      {active ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[#475467] leading-relaxed">{f.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-cta text-white p-10 md:p-20 text-center shadow-glow">
          <Blobs variant="cta" />
          <div className="absolute top-10 left-10 h-12 w-12 rounded-2xl bg-white/20 animate-float" />
          <div
            className="absolute bottom-10 right-12 h-16 w-16 rounded-full bg-[#ffd166] animate-float"
            style={{ animationDelay: "-3s" }}
          />
          <div className="relative max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Let's build
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05]">
              Let's build something bright, scalable, and unforgettable.
            </h2>
            <p className="mt-5 text-lg text-white/85">
              Book a free 30-minute consultation. We'll discuss your goals and outline a plan.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#101828] font-semibold hover:-translate-y-0.5 transition-all"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white font-semibold hover:bg-white/25 transition-all"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
