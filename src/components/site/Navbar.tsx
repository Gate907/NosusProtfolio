import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-[0_4px_24px_-12px_rgba(16,24,40,0.12)] border-b border-[#f2e8d8]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center shadow-soft">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold text-ink">Solaris</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="relative px-4 py-2 text-sm font-medium text-[#475467] hover:text-[#101828] transition-colors rounded-full group/nav"
                activeProps={{ className: "relative px-4 py-2 text-sm font-semibold text-[#ff7a00] rounded-full bg-[#fff7e6] group/nav" }}
              >
                {item.label}
                <span className="absolute bottom-0.5 left-4 right-4 h-[1.5px] bg-[#101828] origin-right scale-x-0 group-hover/nav:scale-x-100 group-hover/nav:origin-left transition-transform duration-300 ease-out rounded-full" />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-cta text-white text-sm font-semibold shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5"
          >
            Get Free Consultation
          </Link>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-lg text-ink"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden fixed inset-0 z-50 bg-white"
          >
            <div className="flex items-center justify-between px-5 h-18 py-4 border-b border-[#f2e8d8]">
              <span className="font-display text-xl font-bold">Solaris</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col p-5 gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-lg font-medium text-[#101828] hover:bg-[#fff7e6] rounded-xl"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-full bg-gradient-cta text-white font-semibold"
              >
                Get Free Consultation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
