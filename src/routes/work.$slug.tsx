import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { PROJECTS, type Project } from "@/lib/site-data";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Case Study | Solaris` },
          { name: "description", content: loaderData.project.description },
          { property: "og:title", content: `${loaderData.project.title} — Case Study` },
          { property: "og:description", content: loaderData.project.description },
        ]
      : [{ title: "Case study — Solaris" }],
  }),
  component: ProjectDetailPage,
  notFoundComponent: () => (
    <Layout>
      <div className="container-x pt-40 pb-32 text-center">
        <h1 className="font-display text-4xl font-bold">Project not found</h1>
        <Link to="/work" className="mt-6 inline-flex text-[#ff7a00] font-semibold">
          Back to all work
        </Link>
      </div>
    </Layout>
  ),
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  const highlights = [
    "Discovery and product strategy workshops",
    "End-to-end design system and brand expression",
    "Full-stack implementation with senior engineers",
    "Performance budgets and accessibility audits",
    "Launch, analytics setup and ongoing iteration",
  ];

  return (
    <Layout>
      <section className="pt-36 pb-12">
        <div className="container-x">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#475467] hover:text-[#ff7a00] mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff7e6] text-[#ff7a00] text-xs font-semibold">
              {project.category}
            </span>
            <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold leading-[1.05] text-[#101828]">
              {project.title}
            </h1>
            <p className="mt-5 text-lg text-[#475467] max-w-2xl">{project.longDescription}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x">
          <div
            className={`relative aspect-[16/8] rounded-[32px] bg-gradient-to-br ${project.gradient} overflow-hidden shadow-glow`}
          >
            <div className="absolute inset-0 grid-pattern opacity-25" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-white font-display text-5xl md:text-7xl font-bold drop-shadow-2xl">
                {project.client}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-[#101828]">The challenge</h2>
              <p className="mt-4 text-[#475467] leading-relaxed">
                {project.client} came to us with an ambitious goal and a tight timeline. Their
                existing product was holding back growth — slow to load, confusing to navigate and
                hard to extend. We were brought in to rethink the experience from the ground up
                while keeping the team shipping.
              </p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-[#101828]">What we did</h2>
              <ul className="mt-4 space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[#101828]">
                    <span className="h-6 w-6 rounded-full bg-[#daf7ee] grid place-items-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-[#06d6a0]" />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-[#101828]">The outcome</h2>
              <p className="mt-4 text-[#475467] leading-relaxed">
                In partnership with {project.client}'s team, we shipped a modern, fast and
                delightful product that customers love. The numbers speak for themselves.
              </p>
            </Reveal>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl p-6 bg-white border border-[#f2e8d8] shadow-card">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
                Client
              </div>
              <div className="mt-1 font-display text-xl font-bold text-[#101828]">{project.client}</div>
              <div className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#667085]">
                Category
              </div>
              <div className="mt-1 text-[#101828]">{project.category}</div>
              <div className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#667085]">
                Tech stack
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-[#fff7e6] border border-[#f2e8d8] text-xs text-[#101828] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl p-6 bg-gradient-brand text-white shadow-glow">
              <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Results</div>
              <div className="mt-4 space-y-4">
                {project.results.map((r) => (
                  <div key={r.label}>
                    <div className="font-display text-3xl font-bold">{r.value}</div>
                    <div className="text-sm opacity-85">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 bg-[#fff7e6] border-t border-[#f2e8d8]">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#101828]">
              More work
            </h2>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff7a00]"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group block rounded-[24px] bg-white border border-[#f2e8d8] overflow-hidden shadow-card hover:-translate-y-1 transition-all"
              >
                <div className={`aspect-[4/3] bg-gradient-to-br ${p.gradient} grid place-items-center`}>
                  <span className="text-white font-display text-xl font-bold drop-shadow-lg">
                    {p.client}
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-display font-bold text-[#101828]">{p.title}</div>
                  <div className="mt-1 text-sm text-[#475467]">{p.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
