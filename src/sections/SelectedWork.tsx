"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { projects, Project } from "@/lib/data";

/* ── FEATURED LAYOUT (Mitra Verify) ── */
const FeaturedLayout = ({ project }: { project: Project }) => (
  <div className="py-12 md:py-16 border-t border-[var(--color-border)]">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      {/* Left — Project Info */}
      <div className="lg:col-span-5">
        <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-accent)] mb-4 uppercase">
          FEATURED PROJECT
        </p>
        <h3 className="text-[2rem] md:text-[2.5rem] font-black tracking-tight text-[var(--color-text-primary)] mb-3 leading-tight">
          {project.title}
        </h3>
        {project.tagline && (
          <p className="text-[11px] font-bold tracking-[0.12em] text-[var(--color-text-secondary)] mb-6 uppercase">
            {project.tagline}
          </p>
        )}

        <p className="text-body text-[15px] leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Problem */}
        {project.problem && (
          <div className="mb-8">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] mb-3 uppercase">
              PROBLEM
            </p>
            <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">
              {project.problem}
            </p>
          </div>
        )}

        {/* Technology */}
        <div className="mb-8">
          <p className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] mb-3 uppercase">
            TECHNOLOGY
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] tracking-[0.08em] text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] px-3 py-1.5 uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-[10px] font-bold tracking-[0.15em] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
              data-cursor="VIEW"
            >
              LIVE PROJECT →
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-primary)] text-[10px] font-bold tracking-[0.15em] hover:bg-[var(--color-bg-secondary)] transition-colors"
            data-cursor="OPEN"
          >
            GITHUB ↗
          </a>
        </div>
      </div>

      {/* Right — What I Built + Implementation */}
      <div className="lg:col-span-6 lg:col-start-7">
        {/* What I Built */}
        <div className="mb-8">
          <p className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] mb-4 uppercase">
            WHAT I BUILT
          </p>
          <div className="grid grid-cols-1 gap-[1px] bg-[var(--color-border)]">
            {project.highlights.map((h, i) => (
              <div
                key={h}
                className="bg-[var(--color-bg-primary)] p-5 flex items-center gap-5"
              >
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                  {h}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Implementation */}
        {project.implementation && (
          <div>
            <p className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] mb-4 uppercase">
              TECHNICAL IMPLEMENTATION
            </p>
            <ul className="space-y-3">
              {project.implementation.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[var(--color-text-tertiary)] leading-relaxed flex items-start gap-3"
                >
                  <span className="text-[var(--color-accent)] mt-1.5 text-[6px]">
                    ●
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  </div>
);

/* ── EDITORIAL LAYOUT (TruthLens — wide row with technical depth) ── */
const EditorialLayout = ({ project }: { project: Project }) => (
  <div className="py-10 md:py-12 border-t border-[var(--color-border)]">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-1">
        <p className="text-[10px] font-mono text-[var(--color-text-muted)]">
          {project.number}
        </p>
      </div>
      <div className="md:col-span-3">
        <h3 className="text-lg font-bold tracking-wide text-[var(--color-text-primary)] mb-1">
          {project.title}
        </h3>
        <p className="text-[10px] tracking-[0.1em] text-[var(--color-text-muted)] mb-4 uppercase">
          {project.category}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[9px] tracking-[0.08em] text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2.5 py-1 uppercase"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="md:col-span-5">
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">
          {project.description}
        </p>
        {project.problem && (
          <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed">
            <span className="text-[9px] font-bold tracking-[0.1em] text-[var(--color-text-muted)] uppercase">Problem: </span>
            {project.problem}
          </p>
        )}
        {project.implementation && (
          <div className="mt-3">
            <p className="text-[9px] font-bold tracking-[0.1em] text-[var(--color-text-muted)] uppercase mb-2">
              Technical Implementation
            </p>
            <ul className="space-y-1.5">
              {project.implementation.map((item) => (
                <li key={item} className="text-xs text-[var(--color-text-tertiary)] leading-relaxed flex items-start gap-2">
                  <span className="text-[var(--color-accent)] mt-1 text-[5px]">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="md:col-span-3 md:text-right">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          data-cursor="OPEN"
        >
          GITHUB ↗
        </a>
      </div>
    </div>
  </div>
);

/* ── SPLIT LAYOUT (Aura AI) ── */
const SplitLayout = ({ project }: { project: Project }) => (
  <div className="py-10 md:py-12 border-t border-[var(--color-border)] group">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-5">
        <p className="text-[10px] font-mono text-[var(--color-text-muted)] mb-2">
          {project.number}
        </p>
        <h3 className="text-xl font-bold tracking-wide text-[var(--color-text-primary)] mb-2">
          {project.title}
        </h3>
        <p className="text-[10px] tracking-[0.1em] text-[var(--color-accent)] mb-4 uppercase">
          {project.category}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[9px] tracking-[0.08em] text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2.5 py-1 uppercase"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="md:col-span-6 md:col-start-7 flex flex-col justify-between">
        <div>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">
            {project.description}
          </p>
          {project.problem && (
            <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed mb-3">
              <span className="text-[9px] font-bold tracking-[0.1em] text-[var(--color-text-muted)] uppercase">Problem: </span>
              {project.problem}
            </p>
          )}
          {project.implementation && (
            <div className="mb-4">
              <p className="text-[9px] font-bold tracking-[0.1em] text-[var(--color-text-muted)] uppercase mb-2">
                Technical Implementation
              </p>
              <ul className="space-y-1.5">
                {project.implementation.map((item) => (
                  <li key={item} className="text-xs text-[var(--color-text-tertiary)] leading-relaxed flex items-start gap-2">
                    <span className="text-[var(--color-accent)] mt-1 text-[5px]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors self-start"
          data-cursor="OPEN"
        >
          SOURCE CODE ↗
        </a>
      </div>
    </div>
  </div>
);

/* ── TECHNICAL LAYOUT (Audit Flow) ── */
const TechnicalLayout = ({ project }: { project: Project }) => (
  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="block py-8 border-t border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-colors duration-300 -mx-4 px-4 group"
    data-cursor="OPEN"
  >
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-1">
        <p className="text-[10px] font-mono text-[var(--color-text-muted)]">
          {project.number}
        </p>
      </div>
      <div className="md:col-span-3">
        <h4 className="text-sm font-bold tracking-wide text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
          {project.title}
        </h4>
      </div>
      <div className="md:col-span-5">
        <p className="text-xs text-[var(--color-text-secondary)]">
          {project.description}
        </p>
      </div>
      <div className="md:col-span-3 md:text-right">
        <p className="text-[9px] tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
          {project.tech.join(" · ")}
        </p>
      </div>
    </div>
  </a>
);

/* ── COMPACT LAYOUT (SEO / Hotspot) ── */
const CompactLayout = ({ project }: { project: Project }) => (
  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="block py-5 border-t border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-colors duration-200 -mx-4 px-4 group"
    data-cursor="OPEN"
  >
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <p className="text-[10px] font-mono text-[var(--color-text-muted)]">
          {project.number}
        </p>
        <h4 className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
          {project.title}
        </h4>
        <p className="text-xs text-[var(--color-text-tertiary)] hidden sm:block">
          {project.description}
        </p>
      </div>
      <p className="text-[10px] tracking-[0.1em] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
        EXPLORE ↗
      </p>
    </div>
  </a>
);

/* ── LAYOUT ROUTER ── */
const ProjectLayout = ({ project }: { project: Project }) => {
  switch (project.layout) {
    case "featured":
      return <FeaturedLayout project={project} />;
    case "editorial":
      return <EditorialLayout project={project} />;
    case "split":
      return <SplitLayout project={project} />;
    case "technical":
      return <TechnicalLayout project={project} />;
    case "compact":
      return <CompactLayout project={project} />;
    default:
      return <CompactLayout project={project} />;
  }
};

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="py-20 md:py-28 relative"
      aria-label="Selected Work"
    >
      <div className="container-grid">
        <ScrollReveal>
          <p className="section-number mb-4">SELECTED WORK</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="text-h1 text-[var(--color-text-primary)] mb-4">
            SELECTED WORK
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-body text-lg mb-12 max-w-xl">
            Systems, applications and experiments I&apos;ve built.
          </p>
        </ScrollReveal>

        {/* Render all projects with their respective layouts */}
        {projects.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.05}>
            <ProjectLayout project={project} />
          </ScrollReveal>
        ))}

        {/* Bottom border of last compact */}
        <div className="border-t border-[var(--color-border)]" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
    </section>
  );
}
