import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
} from "framer-motion";

const ITEMS = [
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "E-commerce",
  "Custom Software",
  "AI & Automation",
  "SaaS Platforms",
  "Brand Systems",
];

const ROW = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export function MarqueeStrip() {
  const baseX = useMotionValue(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const unitWidth = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (stripRef.current) {
        unitWidth.current = stripRef.current.scrollWidth / 4;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 300, mass: 0.8 });
  const velocityFactor = useTransform(
    smoothVelocity,
    [-1500, -200, 0, 200, 1500],
    [-6, -0.5, 0, 0.5, 6],
    { clamp: false }
  );
  const smoothBoost = useSpring(velocityFactor, { damping: 40, stiffness: 200, mass: 0.5 });

  useAnimationFrame((_: number, delta: number) => {
    const dt = Math.min(delta, 33);
    const boost = smoothBoost.get();
    const move = -1 * (18 + boost * 8) * (dt / 1000);
    const u = unitWidth.current;
    let next = baseX.get() + move;
    if (u > 0) {
      next = ((next % u) + u) % u;
      next = next - u;
    }
    baseX.set(next);
  });

  return (
    <section className="relative z-10 py-10 bg-white border-y border-[#f2e8d8] overflow-hidden shadow-[0_-1px_0_0_#f2e8d8]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />
        <motion.div
          ref={stripRef}
          style={{ x: baseX }}
          className="flex whitespace-nowrap will-change-transform"
          aria-hidden
        >
          {ROW.map((item, i) => (
            <div key={i} className="inline-flex items-center shrink-0 mx-8">
              <span className="font-display text-2xl md:text-3xl font-bold text-[#101828]/80">
                {item}
              </span>
              <span className="ml-8 h-2.5 w-2.5 rounded-full bg-gradient-brand flex-shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
