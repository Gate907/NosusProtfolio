import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, ShieldCheck, Twitter, Linkedin, Github, Sparkles, Check } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { Blobs } from "@/components/site/Blobs";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Solaris Studio" },
      {
        name: "description",
        content: "Book a free 30-minute consultation. Tell us about your project and we'll get back within one business day.",
      },
      { property: "og:title", content: "Contact Solaris" },
      { property: "og:description", content: "Get a free consultation with our team." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  mobile: z.string().trim().min(6, "Please enter a valid phone number").max(20),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().min(1, "Pick a service"),
  budget: z.string().min(1, "Select a budget"),
  timeline: z.string().min(1, "Select a timeline"),
  message: z.string().trim().min(10, "Tell us a bit more (min 10 chars)").max(2000),
});

type FormState = z.infer<typeof schema>;

const EMPTY: FormState = {
  name: "",
  email: "",
  mobile: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
};

function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }
    setStatus("success");
    setForm(EMPTY);
  };

  const fieldCls =
    "w-full rounded-2xl bg-white border border-[#f2e8d8] px-4 py-3 text-[#101828] placeholder:text-[#667085] focus:outline-none focus:border-[#ff7a00] focus:ring-4 focus:ring-[#ff7a00]/15 transition-all";

  return (
    <Layout>
      <section className="relative pt-36 pb-16 overflow-hidden">
        <Blobs variant="hero" />
        <div className="container-x relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff7e6] border border-[#f2e8d8] text-xs font-semibold uppercase tracking-wider text-[#ff7a00]">
                <Sparkles className="h-3 w-3" /> Free Consultation
              </span>
              <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold leading-[1.05] text-[#101828]">
                Let's build something <span className="text-gradient">bright</span>.
              </h1>
              <p className="mt-5 text-lg text-[#475467]">
                Share a bit about your project and we'll get back within one business day with next
                steps and a free 30-minute consultation slot.
              </p>

              <div className="mt-10 space-y-4">
                <ContactRow icon={Mail} label="Email" value="hello@solaris.studio" />
                <ContactRow icon={Phone} label="Phone" value="+1 (415) 555-0117" />
                <ContactRow icon={MapPin} label="Studio" value="San Francisco, CA" />
              </div>

              <div className="mt-8 flex items-center gap-3">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="social"
                    className="h-11 w-11 rounded-full bg-white border border-[#f2e8d8] grid place-items-center text-[#475467] hover:bg-gradient-cta hover:text-white hover:border-transparent transition-all"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-[28px] bg-white border border-[#f2e8d8] shadow-card p-6 md:p-8 space-y-5"
              >
                {status === "success" && (
                  <div className="rounded-2xl bg-[#daf7ee] border border-[#06d6a0]/30 p-4 flex items-start gap-3">
                    <span className="h-8 w-8 rounded-full bg-[#06d6a0] grid place-items-center text-white shrink-0">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-display font-bold text-[#101828]">Thanks! Message sent.</div>
                      <div className="text-sm text-[#475467]">
                        We'll get back to you within one business day.
                      </div>
                    </div>
                  </div>
                )}

                <Field label="Full Name" error={errors.name}>
                  <input className={fieldCls} placeholder="Jane Doe" value={form.name} onChange={update("name")} />
                </Field>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Email Address" error={errors.email}>
                    <input type="email" className={fieldCls} placeholder="you@company.com" value={form.email} onChange={update("email")} />
                  </Field>
                  <Field label="Mobile Number" error={errors.mobile}>
                    <input className={fieldCls} placeholder="+1 555 000 0000" value={form.mobile} onChange={update("mobile")} />
                  </Field>
                </div>

                <Field label="Company Name" error={errors.company}>
                  <input className={fieldCls} placeholder="Acme Inc." value={form.company} onChange={update("company")} />
                </Field>

                <Field label="Service Interested In" error={errors.service}>
                  <select className={fieldCls} value={form.service} onChange={update("service")}>
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Budget Range" error={errors.budget}>
                    <select className={fieldCls} value={form.budget} onChange={update("budget")}>
                      <option value="">Select budget</option>
                      <option>Under $10k</option>
                      <option>$10k – $25k</option>
                      <option>$25k – $50k</option>
                      <option>$50k – $100k</option>
                      <option>$100k+</option>
                    </select>
                  </Field>
                  <Field label="Project Timeline" error={errors.timeline}>
                    <select className={fieldCls} value={form.timeline} onChange={update("timeline")}>
                      <option value="">Select timeline</option>
                      <option>ASAP</option>
                      <option>Within 1 month</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>Flexible</option>
                    </select>
                  </Field>
                </div>

                <Field label="Project Message" error={errors.message}>
                  <textarea
                    rows={5}
                    className={fieldCls + " resize-none"}
                    placeholder="Tell us about your project, goals and any constraints…"
                    value={form.message}
                    onChange={update("message")}
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-cta text-white font-semibold shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all"
                >
                  Send Message
                </button>

                <div className="flex items-start gap-2 text-xs text-[#667085]">
                  <ShieldCheck className="h-4 w-4 text-[#06d6a0] shrink-0 mt-0.5" />
                  Your information is secure. We'll only use it to reply to your inquiry.
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#f2e8d8]">
      <div className="h-11 w-11 rounded-xl bg-gradient-brand grid place-items-center text-white shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[#667085]">{label}</div>
        <div className="font-medium text-[#101828]">{value}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-[#101828] mb-2">{label}</div>
      {children}
      {error && <div className="mt-1.5 text-xs text-[#ef476f] font-medium">{error}</div>}
    </label>
  );
}
