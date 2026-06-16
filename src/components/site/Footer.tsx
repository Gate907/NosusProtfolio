import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Linkedin, Github, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 bg-[#101828] text-white overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#ff7a00]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#118ab2]/20 blur-3xl" />
      <div className="container-x relative py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-brand grid place-items-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold">Solaris</span>
            </div>
            <p className="mt-5 text-white/70 max-w-md leading-relaxed">
              We design and build bright, fast, future-ready digital products for startups and
              ambitious teams.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/10 grid place-items-center hover:bg-gradient-cta transition-all"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Studio</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {[
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/work", label: "Work" },
                { to: "/industries", label: "Industries" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Get in touch</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>hello@solaris.studio</li>
              <li>+1 (415) 555-0117</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Solaris Studio. All rights reserved.</p>
          <p>Built bright. Shipped fast.</p>
        </div>
      </div>
    </footer>
  );
}
