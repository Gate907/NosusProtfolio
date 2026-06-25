import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, ShieldCheck, Twitter, Linkedin, Github, Sparkles, Check, AlertCircle, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
type Status = "idle" | "submitting" | "success" | "error";

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

// Replace with your Web3Forms access key from https://web3forms.com
// It's free — just add your email there to get a key.
const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (k: keyof FormState, val: string) => {
    const partial = { ...EMPTY, [k]: val };
    const result = schema.safeParse(partial);
    if (result.success) return undefined;
    const issue = result.error.issues.find((i) => i.path[0] === k);
    return issue?.message;
  };

  const update = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
    if (touched[k]) {
      const err = validateField(k, val);
      setErrors((er) => ({ ...er, [k]: err }));
    }
  };

  const onBlur = (k: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    const err = validateField(k, form[k] as string);
    setErrors((er) => ({ ...er, [k]: err }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields touched and validate
    const allTouched = Object.keys(EMPTY).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Record<keyof FormState, boolean>
    );
    setTouched(allTouched);

    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      // Scroll to first error
      formRef.current?.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New inquiry from ${form.name} — ${form.service}`,
        from_name: "Solaris Contact Form",
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        company: form.company || "—",
        service: form.service,
        budget: form.budget,
        timeline: form.timeline,
        message: form.message,
        botcheck: "",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
        setForm(EMPTY);
        setErrors({});
        setTouched({});
      } else {
        throw new Error(json.message || "Submission failed");
      }
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const fieldCls = (k: keyof FormState) =>
    [
      "w-full rounded-2xl bg-white border px-4 py-3 text-[#101828] placeholder:text-[#667085]",
      "focus:outline-none focus:ring-4 transition-all",
      errors[k] && touched[k]
        ? "border-[#ef476f] focus:border-[#ef476f] focus:ring-[#ef476f]/15"
        : "border-[#f2e8d8] focus:border-[#ff7a00] focus:ring-[#ff7a00]/15",
    ].join(" ");

  const isSubmitting = status === "submitting";

  return (
    <Layout>
      <section className="relative pt-36 pb-16">
        <Blobs variant="hero" />
        <div className="container-x relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — info */}
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

            {/* Right — form */}
            <Reveal delay={0.1}>
              <form
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                className="rounded-[28px] bg-white border border-[#f2e8d8] shadow-card p-6 md:p-8 space-y-5"
              >
                {/* Success banner */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="rounded-2xl bg-[#daf7ee] border border-[#06d6a0]/30 p-4 flex items-start gap-3"
                    >
                      <span className="h-8 w-8 rounded-full bg-[#06d6a0] grid place-items-center text-white shrink-0">
                        <Check className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="font-display font-bold text-[#101828]">Message sent!</div>
                        <div className="text-sm text-[#475467]">
                          We'll get back to you within one business day.
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Error banner */}
                  {status === "error" && serverError && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="rounded-2xl bg-[#fde8ee] border border-[#ef476f]/30 p-4 flex items-start gap-3"
                    >
                      <span className="h-8 w-8 rounded-full bg-[#ef476f] grid place-items-center text-white shrink-0">
                        <AlertCircle className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="font-display font-bold text-[#101828]">Submission failed</div>
                        <div className="text-sm text-[#475467]">{serverError}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Field label="Full Name" error={touched.name ? errors.name : undefined}>
                  <input
                    className={fieldCls("name")}
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={update("name")}
                    onBlur={onBlur("name")}
                    disabled={isSubmitting}
                    {...(errors.name && touched.name ? { "data-error": true } : {})}
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Email Address" error={touched.email ? errors.email : undefined}>
                    <input
                      type="email"
                      className={fieldCls("email")}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={update("email")}
                      onBlur={onBlur("email")}
                      disabled={isSubmitting}
                    />
                  </Field>
                  <Field label="Mobile Number" error={touched.mobile ? errors.mobile : undefined}>
                    <input
                      type="tel"
                      className={fieldCls("mobile")}
                      placeholder="+1 555 000 0000"
                      value={form.mobile}
                      onChange={update("mobile")}
                      onBlur={onBlur("mobile")}
                      disabled={isSubmitting}
                    />
                  </Field>
                </div>

                <Field label="Company Name" error={touched.company ? errors.company : undefined}>
                  <input
                    className={fieldCls("company")}
                    placeholder="Acme Inc. (optional)"
                    value={form.company}
                    onChange={update("company")}
                    onBlur={onBlur("company")}
                    disabled={isSubmitting}
                  />
                </Field>

                <Field label="Service Interested In" error={touched.service ? errors.service : undefined}>
                  <select
                    className={fieldCls("service")}
                    value={form.service}
                    onChange={update("service")}
                    onBlur={onBlur("service")}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Budget Range" error={touched.budget ? errors.budget : undefined}>
                    <select
                      className={fieldCls("budget")}
                      value={form.budget}
                      onChange={update("budget")}
                      onBlur={onBlur("budget")}
                      disabled={isSubmitting}
                    >
                      <option value="">Select budget</option>
                      <option>Under $10k</option>
                      <option>$10k – $25k</option>
                      <option>$25k – $50k</option>
                      <option>$50k – $100k</option>
                      <option>$100k+</option>
                    </select>
                  </Field>
                  <Field label="Project Timeline" error={touched.timeline ? errors.timeline : undefined}>
                    <select
                      className={fieldCls("timeline")}
                      value={form.timeline}
                      onChange={update("timeline")}
                      onBlur={onBlur("timeline")}
                      disabled={isSubmitting}
                    >
                      <option value="">Select timeline</option>
                      <option>ASAP</option>
                      <option>Within 1 month</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>Flexible</option>
                    </select>
                  </Field>
                </div>

                <Field label="Project Message" error={touched.message ? errors.message : undefined}>
                  <div className="relative">
                    <textarea
                      rows={5}
                      className={fieldCls("message") + " resize-none"}
                      placeholder="Tell us about your project, goals and any constraints…"
                      value={form.message}
                      onChange={update("message")}
                      onBlur={onBlur("message")}
                      disabled={isSubmitting}
                      maxLength={2000}
                    />
                    <span className="absolute bottom-3 right-4 text-[11px] text-[#667085]">
                      {form.message.length}/2000
                    </span>
                  </div>
                </Field>

                {/* Hidden honeypot — catches bots */}
                <input type="checkbox" name="botcheck" className="hidden" />

                <button
                  type="submit"
                  disabled={isSubmitting || status === "success"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-cta text-white font-semibold shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-soft"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check className="h-4 w-4" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
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
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="text-xs text-[#ef476f] font-medium overflow-hidden"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </label>
  );
}
