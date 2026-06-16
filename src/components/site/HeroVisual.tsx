import { motion } from "framer-motion";
import { BarChart3, Users, TrendingUp, Zap, Sparkles, Layers } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative h-[520px] w-full">
      {/* Glow */}
      <div className="absolute inset-10 rounded-[40px] bg-gradient-brand opacity-20 blur-3xl" />

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div className="relative w-full max-w-[520px] rounded-[28px] bg-white shadow-glow border border-[#f2e8d8] p-6 animate-float">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ef476f]" />
              <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
              <span className="h-3 w-3 rounded-full bg-[#06d6a0]" />
            </div>
            <div className="text-xs text-[#667085] font-medium">solaris.app/dashboard</div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-2xl p-4 bg-gradient-to-br from-[#fff7e6] to-white border border-[#f2e8d8]">
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-[#ff7a00]" />
                <span className="text-xs font-semibold text-[#06d6a0]">+24%</span>
              </div>
              <div className="mt-3 font-display text-2xl font-bold text-[#101828]">12.4k</div>
              <div className="text-xs text-[#667085]">Active users</div>
            </div>
            <div className="rounded-2xl p-4 bg-gradient-to-br from-[#fff7e6] to-white border border-[#f2e8d8]">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-5 w-5 text-[#118ab2]" />
                <span className="text-xs font-semibold text-[#06d6a0]">+12%</span>
              </div>
              <div className="mt-3 font-display text-2xl font-bold text-[#101828]">$84.2k</div>
              <div className="text-xs text-[#667085]">Revenue</div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#fffdf7] border border-[#f2e8d8] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#ff7a00]" />
                <span className="text-sm font-semibold text-[#101828]">Performance</span>
              </div>
              <span className="text-xs text-[#667085]">Last 7 days</span>
            </div>
            <div className="flex items-end gap-2 h-24">
              {[40, 65, 50, 80, 55, 95, 75].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.8 + i * 0.07, duration: 0.6 }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-[#ff7a00] to-[#ffd166]"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating card 1 */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="absolute top-8 left-0 sm:-left-4 glass-card rounded-2xl p-4 w-52 animate-float"
        style={{ animationDelay: "-2s" }}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#06d6a0]/15 grid place-items-center">
            <Zap className="h-5 w-5 text-[#06d6a0]" />
          </div>
          <div>
            <div className="text-xs text-[#667085]">Page Speed</div>
            <div className="font-display font-bold text-[#101828]">98 / 100</div>
          </div>
        </div>
      </motion.div>

      {/* Floating card 2 */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 1 }}
        className="absolute bottom-12 right-0 sm:-right-4 glass-card rounded-2xl p-4 w-56 animate-float"
        style={{ animationDelay: "-4s" }}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-cta grid place-items-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-[#667085]">Conversion</div>
            <div className="font-display font-bold text-[#101828]">+38% this week</div>
          </div>
        </div>
      </motion.div>

      {/* Tiny orbit chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute top-1/2 -right-2 sm:right-2 h-14 w-14 rounded-2xl bg-white shadow-soft border border-[#f2e8d8] grid place-items-center animate-float"
        style={{ animationDelay: "-3s" }}
      >
        <Layers className="h-6 w-6 text-[#118ab2]" />
      </motion.div>
    </div>
  );
}
