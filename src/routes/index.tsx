import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
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
import { MarqueeStrip } from "@/components/site/MarqueeStrip";
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
      <MarqueeStrip />
      <WhoWeAre />
      <Stats />
      <ServicesPreview />
      <FeaturedWork />
      <Showreel />
      <ProcessTimeline />
      <IndustriesGrid />
      <WhyChooseUs />
      <FAQ />
      <FinalCTA />
    </Layout>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagnetic(0.4);
  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll parallax for the whole background
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Mouse-tracking state → spring-smoothed MotionValues
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 60, damping: 20, mass: 0.8 });
  const mouseY = useSpring(rawMouseY, { stiffness: 60, damping: 20, mass: 0.8 });

  // Per-layer parallax — deeper layers move more
  const imgX  = useTransform(mouseX, v => v * 0.018);
  const imgY  = useTransform(mouseY, v => v * 0.018);
  const b1X   = useTransform(mouseX, v => v * 0.04);
  const b1Y   = useTransform(mouseY, v => v * 0.04);
  const b2X   = useTransform(mouseX, v => v * 0.07);
  const b2Y   = useTransform(mouseY, v => v * 0.07);
  const b3X   = useTransform(mouseX, v => v * 0.05);
  const b3Y   = useTransform(mouseY, v => v * 0.05);
  const b4X   = useTransform(mouseX, v => v * 0.09);
  const b4Y   = useTransform(mouseY, v => v * 0.09);
  const gridX = useTransform(mouseX, v => v * 0.025);
  const gridY = useTransform(mouseY, v => v * 0.025);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawMouseX.set(e.clientX - cx);
    rawMouseY.set(e.clientY - cy);
  }, [rawMouseX, rawMouseY]);

  const handleMouseLeave = useCallback(() => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  }, [rawMouseX, rawMouseY]);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-0 pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden"
    >
      {/* ── Layer 0: scroll parallax wrapper ── */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">

        {/* Layer 1 — Banner image (slowest, furthest back) */}
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="absolute inset-[-4%] will-change-transform"
        >
          <img
            src="/image/HomeBanner.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/72" />

        {/* Layer 2 — Blob 1 (orange, top-left) */}
        <motion.div
          style={{ x: b1X, y: b1Y }}
          className="pointer-events-none absolute top-[-10%] left-[-5%] h-[clamp(320px,35vw,560px)] w-[clamp(320px,35vw,560px)] rounded-full bg-[#ff7a00]/25 blur-3xl animate-blob will-change-transform"
        />

        {/* Layer 3 — Blob 2 (yellow, top-right, deeper) */}
        <motion.div
          style={{ x: b2X, y: b2Y, animationDelay: "-4s" }}
          className="pointer-events-none absolute top-[10%] right-[-8%] h-[clamp(340px,38vw,600px)] w-[clamp(340px,38vw,600px)] rounded-full bg-[#ffd166]/40 blur-3xl animate-blob will-change-transform"
        />

        {/* Layer 4 — Blob 3 (green, bottom-left) */}
        <motion.div
          style={{ x: b3X, y: b3Y }}
          className="pointer-events-none absolute bottom-[-15%] left-[20%] h-[clamp(300px,32vw,520px)] w-[clamp(300px,32vw,520px)] rounded-full bg-[#06d6a0]/25 blur-3xl animate-blob will-change-transform"
        />

        {/* Layer 5 — Blob 4 (blue, bottom-right, deepest) */}
        <motion.div
          style={{ x: b4X, y: b4Y }}
          className="pointer-events-none absolute bottom-[5%] right-[15%] h-[clamp(240px,28vw,460px)] w-[clamp(240px,28vw,460px)] rounded-full bg-[#118ab2]/20 blur-3xl animate-blob will-change-transform"
        />

        {/* Layer 6 — Grid pattern (mid depth) */}
        <motion.div
          style={{ x: gridX, y: gridY }}
          className="pointer-events-none absolute inset-[-3%] grid-pattern opacity-60 will-change-transform"
        />
      </motion.div>

      <div className="container-x relative">
        <div className="grid lg:grid-cols-[1fr_minmax(0,560px)] gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className="min-w-0">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#f2e8d8] text-xs font-semibold uppercase tracking-wider text-[#ff7a00]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Creative Digital Product Studio
            </motion.span>

            <h1 className="mt-6 font-display text-[clamp(32px,3.2vw,60px)] leading-[1.2] font-bold text-[#101828]">
              {[
                [{ w: "We" }, { w: "Build" }, { w: "Digital", g: true }],
                [{ w: "Products" }, { w: "That" , g: true}, { w: "Feel" }],
                [{ w: "Bright,", g:"true"}, { w: "Fast" }, { w: "&", g: true }],
              ].map((words, lineIdx) => (
                <span key={lineIdx} className="block overflow-hidden py-[0.08em]">
                  {words.map((item, wi) => {
                    const globalWi = [3, 3, 3].slice(0, lineIdx).reduce((a, n) => a + n, 0) + wi;
                    return (
                      <span key={wi} className="inline-block mr-[0.28em] last:mr-0">
                        <motion.span
                          className={`inline-block${item.g ? " text-gradient" : ""}`}
                          initial={{ y: "115%" }}
                          animate={{ y: "0%" }}
                          transition={{ duration: 0.65, delay: 0.18 + globalWi * 0.07, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {item.w}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
              <span className="block overflow-hidden py-[0.1em]">
                {["Future-Ready."].map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-gradient"
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.65, delay: 0.18 + 9 * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
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
              <MagneticButton>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#101828] text-white font-semibold shadow-soft"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-cta text-white font-semibold shadow-soft hover:shadow-glow"
                >
                  Get Free Consultation
                </Link>
              </MagneticButton>
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

          <motion.div style={{ y: yVisual }} className="min-w-0">
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }, [x, y, strength]);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, style: { x: springX, y: springY }, onMouseMove: onMove, onMouseLeave: onLeave };
}

function useCountUp(target: number, duration = 1800, decimals = 0) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const startAnimation = useCallback(() => {
    if (started) return;
    setStarted(true);
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = eased * target;
      setDisplay(decimals > 0 ? val.toFixed(decimals) : String(Math.floor(val)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration, decimals]);
  return { display, startAnimation };
}

function WhoWeAre() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none"><Blobs variant="soft" /></div>
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
              {[
                { val: "8+", sub: "Years building products", bg: "bg-white border-[#f2e8d8]", color: "text-gradient" },
                { val: "12", sub: "Senior product folks", bg: "bg-[#fff7e6] border-[#f2e8d8]", color: "text-[#ff7a00]" },
                { val: "120+", sub: "Products shipped", bg: "bg-[#daf7ee] border-[#06d6a0]/20", color: "text-[#06d6a0]" },
                { val: "22", sub: "Industry awards", bg: "bg-[#e0f2f8] border-[#118ab2]/20", color: "text-[#118ab2]" },
              ].map((card, i) => (
                <motion.div
                  key={card.sub}
                  className={`rounded-3xl p-6 border ${card.bg}`}
                  initial={{ opacity: 0, filter: "blur(12px)", scale: 0.96 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                >
                  <div className={`font-display text-5xl font-bold ${card.color}`}>{card.val}</div>
                  <div className="mt-2 text-sm text-[#475467]">{card.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CounterStat({ target, suffix, label, color, delay, decimals = 0 }: {
  target: number; suffix: string; label: string; color: string; delay: number; decimals?: number;
}) {
  const { display, startAnimation } = useCountUp(target, 1600, decimals);
  return (
    <motion.div
      className="p-8 text-center bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      onViewportEnter={startAnimation}
    >
      <div className="font-display text-4xl md:text-5xl font-bold" style={{ color }}>
        {display}{suffix}
      </div>
      <div className="mt-2 text-sm text-[#475467]">{label}</div>
    </motion.div>
  );
}

function Stats() {
  const stats = [
    { target: 120, suffix: "+", label: "Products shipped", color: "#ff7a00", decimals: 0 },
    { target: 38, suffix: "%", label: "Avg conversion lift", color: "#06d6a0", decimals: 0 },
    { target: 4.9, suffix: "/5", label: "Client rating", color: "#ffd166", decimals: 1 },
    { target: 14, suffix: "", label: "Countries served", color: "#118ab2", decimals: 0 },
  ];
  return (
    <section className="py-12">
      <div className="container-x">
        <div className="rounded-[32px] bg-gradient-brand p-1 shadow-glow">
          <div className="rounded-[28px] bg-white grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden">
            {stats.map((s, i) => (
              <CounterStat key={s.label} {...s} delay={i * 0.08} />
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

function ParallaxWorkCard({ p, depth = 1 }: { p: (typeof PROJECTS)[number]; depth?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });

  // Spring-smoothed parallax — prevents sharp jumps when scroll direction reverses
  const rawY = useTransform(scrollYProgress, [0, 1], [-12 * depth, 12 * depth]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.5 });

  // Subtle counter-scale: as image shifts down, it breathes slightly larger — depth illusion
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.08, 1.15]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/work/$slug"
        params={{ slug: p.slug }}
        className="group block relative rounded-[28px] overflow-hidden bg-white border border-[#f2e8d8] shadow-card hover:shadow-glow transition-all"
      >
        <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.gradient} overflow-hidden`}>
          {/* Parallax layer — scaled up so edges never show during travel */}
          <motion.div style={{ y, scale }} className="absolute inset-0">
            {/* Ken Burns slow zoom on the gradient background */}
            <div className="absolute inset-0 animate-ken-burns" />
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-white/95 font-display text-3xl font-bold drop-shadow-lg">
                {p.client}
              </div>
            </div>
          </motion.div>
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
    </motion.div>
  );
}

function FeaturedWork() {
  const featured = PROJECTS.filter((p) => p.featured);
  return (
    <section className="relative py-24 md:py-32 bg-[#fff7e6] border-y border-[#f2e8d8]">
      <div className="container-x">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div className="max-w-3xl text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#f2e8d8] text-xs font-semibold uppercase tracking-wider text-[#ff7a00]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a00]" />
              Featured work
            </motion.span>
            {/* Curtain wipe reveal */}
            <div className="mt-5 relative overflow-hidden">
              <motion.h2
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] text-[#101828]"
              >
                Recent products we're <span className="text-gradient">proud of</span>
              </motion.h2>
              {/* The curtain overlay that sweeps left then exits right */}
              <motion.div
                className="absolute inset-0 bg-[#101828] origin-left"
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
                style={{ transformOrigin: "right" }}
              />
            </div>
          </div>
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
            <ParallaxWorkCard key={p.slug} p={p} depth={i % 2 === 0 ? 1 : 1.6} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Showreel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65], [0.55, 1, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.35, 0.65], ["80px", "0px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden">
      <div className="container-x w-full">
      <motion.div
        style={{ scale, borderRadius, opacity }}
        className="relative w-full aspect-[16/7] bg-gradient-to-br from-[#101828] via-[#1a2540] to-[#0d1f3c] overflow-hidden will-change-transform"
      >
        {/* Animated gradient orbs inside */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[#ff7a00]/30 blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[#06d6a0]/20 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#118ab2]/20 blur-3xl animate-blob" style={{ animationDelay: "-12s" }} />
        </div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-10" />
        {/* Center content */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs font-semibold uppercase tracking-wider text-white/80 mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Our Work in Motion
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
            Products that feel<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a00] via-[#ffd166] to-[#06d6a0]">
              alive.
            </span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl">
            Every pixel crafted with purpose. Every interaction felt by your users.
          </p>
          <Link
            to="/work"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#101828] font-semibold hover:-translate-y-0.5 transition-all"
          >
            See All Work <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.15"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we work"
          title={<>A simple <span className="text-gradient">5-step</span> process</>}
          description="No black boxes. You're involved at every step — from kickoff to launch."
        />

        <div ref={ref} className="mt-20 relative max-w-5xl mx-auto">
          {/* Vertical spine — center on md+, left on mobile */}
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#f2e8d8] rounded-full" />
          <motion.div
            style={{ height: lineHeight, background: "var(--gradient-brand)" }}
            className="absolute left-7 md:left-1/2 top-0 w-[2px] -translate-x-1/2 origin-top rounded-full"
          />

          <div className="space-y-16">
            {PROCESS.map((p, i) => {
              const isEven = i % 2 === 0;
              return (
                <Reveal key={p.step} delay={i * 0.08}>
                  {/* Mobile: icon left, card right */}
                  <div className="flex md:hidden items-start gap-5 pl-0">
                    <div className="relative z-10 h-14 w-14 shrink-0 rounded-2xl bg-white border-2 border-[#f2e8d8] shadow-card grid place-items-center">
                      <span className="font-display text-lg font-bold text-gradient">{p.step}</span>
                    </div>
                    <ProcessCard p={p} align="left" />
                  </div>

                  {/* Desktop: true zigzag */}
                  <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] items-center gap-0">
                    {/* Left slot */}
                    <div className={`flex ${isEven ? "justify-end pr-8" : "justify-start"}`}>
                      {isEven && <ProcessCard p={p} align="right" />}
                    </div>

                    {/* Center node */}
                    <div className="flex justify-center">
                      <div className="relative z-10 h-16 w-16 rounded-2xl bg-white border-2 border-[#f2e8d8] shadow-card grid place-items-center">
                        <span className="font-display text-xl font-bold text-gradient">{p.step}</span>
                      </div>
                    </div>

                    {/* Right slot */}
                    <div className={`flex ${!isEven ? "justify-start pl-8" : "justify-end"}`}>
                      {!isEven && <ProcessCard p={p} align="left" />}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ p, align }: { p: { title: string; desc: string }; align: "left" | "right" }) {
  return (
    <div
      className={`rounded-2xl p-6 bg-white border border-[#f2e8d8] shadow-card w-full max-w-sm ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <h3 className="font-display text-xl font-bold text-[#101828]">{p.title}</h3>
      <p className="mt-2 text-[#475467] text-sm leading-relaxed">{p.desc}</p>
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
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#101828] font-semibold"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white font-semibold hover:bg-white/25 transition-all"
                >
                  View Our Work
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
