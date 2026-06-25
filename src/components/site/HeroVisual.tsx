import { motion } from "framer-motion";
import { BarChart3, Users, TrendingUp, Zap, Sparkles, Layers } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative w-full" style={{ height: "clamp(460px, 50vw, 580px)" }}>

      {/* Ambient glow */}
      <div className="absolute inset-8 rounded-[40px] bg-gradient-brand opacity-20 blur-3xl pointer-events-none" />

      {/* ── Main dashboard card ── centered with room for chips on all sides */}
      <motion.div
        initial={{ opacity: 0, y: 36, rotateX: -8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
        style={{ perspective: "1200px" }}
        className="absolute inset-x-[10%] top-[12%] bottom-[12%] animate-float"
      >
        <div className="h-full rounded-[24px] bg-white shadow-glow border border-[#f2e8d8] p-5 flex flex-col">
          {/* Title bar */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ef476f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
            </div>
            <div className="text-[11px] text-[#667085] font-medium">solaris.app/dashboard</div>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-3 mb-3 shrink-0">
            <div className="rounded-2xl p-3.5 bg-gradient-to-br from-[#fff7e6] to-white border border-[#f2e8d8]">
              <div className="flex items-center justify-between">
                <Users className="h-4 w-4 text-[#ff7a00]" />
                <span className="text-[11px] font-semibold text-[#06d6a0]">+24%</span>
              </div>
              <div className="mt-2 font-display text-xl font-bold text-[#101828]">12.4k</div>
              <div className="text-[11px] text-[#667085]">Active users</div>
            </div>
            <div className="rounded-2xl p-3.5 bg-gradient-to-br from-[#fff7e6] to-white border border-[#f2e8d8]">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-4 w-4 text-[#118ab2]" />
                <span className="text-[11px] font-semibold text-[#06d6a0]">+12%</span>
              </div>
              <div className="mt-2 font-display text-xl font-bold text-[#101828]">$84.2k</div>
              <div className="text-[11px] text-[#667085]">Revenue</div>
            </div>
          </div>

          {/* Bar chart */}
          <div className="rounded-2xl bg-[#fffdf7] border border-[#f2e8d8] p-4 flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#ff7a00]" />
                <span className="text-sm font-semibold text-[#101828]">Performance</span>
              </div>
              <span className="text-[11px] text-[#667085]">Last 7 days</span>
            </div>
            <div className="flex items-end gap-1.5 flex-1 min-h-0">
              {[40, 65, 50, 80, 55, 95, 75].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  style={{ originY: 1, height: `${h}%` }}
                  transition={{ delay: 0.8 + i * 0.07, duration: 0.5 }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-[#ff7a00] to-[#ffd166]"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Chip: Page Speed — top-left, overlaps card corner ── */}
      <motion.div
        initial={{ opacity: 0, x: -24, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="absolute top-[6%] left-[2%] glass-card rounded-2xl p-3 animate-float z-10"
        style={{ animationDelay: "-2s", width: "clamp(148px,13vw,176px)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 shrink-0 rounded-xl bg-[#06d6a0]/15 grid place-items-center">
            <Zap className="h-4 w-4 text-[#06d6a0]" />
          </div>
          <div>
            <div className="text-[10px] text-[#667085]">Page Speed</div>
            <div className="font-display text-sm font-bold text-[#101828]">98 / 100</div>
          </div>
        </div>
      </motion.div>

      {/* ── Chip: Conversion — bottom-right, overlaps card corner ── */}
      <motion.div
        initial={{ opacity: 0, x: 24, y: -12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 1.05 }}
        className="absolute bottom-[6%] right-[2%] glass-card rounded-2xl p-3 animate-float z-10"
        style={{ animationDelay: "-4s", width: "clamp(160px,14vw,192px)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 shrink-0 rounded-xl bg-gradient-cta grid place-items-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-[10px] text-[#667085]">Conversion</div>
            <div className="font-display text-sm font-bold text-[#101828]">+38% this week</div>
          </div>
        </div>
      </motion.div>

      {/* ── Chip: Layers icon — mid right edge of card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute top-[44%] right-[4%] h-11 w-11 rounded-2xl bg-white shadow-soft border border-[#f2e8d8] grid place-items-center animate-float z-10"
        style={{ animationDelay: "-3s" }}
      >
        <Layers className="h-5 w-5 text-[#118ab2]" />
      </motion.div>
    </div>
  );
}
