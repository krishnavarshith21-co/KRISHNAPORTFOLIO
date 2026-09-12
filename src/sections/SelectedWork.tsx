"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxLayer } from "@/components/ScrollParallax";
import { projects, Project } from "@/lib/data";

const UnifiedProjectLayout = ({ project, isFeatured = false }: { project: Project, isFeatured?: boolean }) => (
  <div className="py-16 md:py-24 border-t border-[var(--color-border)] group">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
      
      {/* Left Column */}
      <div className="md:col-span-5">
        <ScrollReveal distance={20}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-mono text-[var(--color-text-muted)]">{project.number}</span>
            <span className="text-eyebrow text-[var(--color-accent)]">
              {project.badge || project.category || "PROJECT"}
            </span>
          </div>
          
          <h3 className={`${isFeatured ? 'text-[2.75rem] md:text-[3.5rem]' : 'text-[2rem] md:text-[2.5rem]'} font-black tracking-tight text-[var(--color-text-primary)] mb-3 leading-[0.95] transition-transform duration-300 group-hover:translate-x-[3px]`}>
            {project.title}
          </h3>
          
          {project.tagline && (
            <p className="text-[11px] font-bold tracking-[0.12em] text-[var(--color-text-secondary)] mb-6 uppercase">
              {project.tagline}
            </p>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.08} distance={16}>
          <p className="text-body leading-relaxed mb-8">
            {project.description}
          </p>
        </ScrollReveal>

        {project.problem && (
          <ScrollReveal delay={0.12} distance={16}>
            <div className="mb-8">
              <p className="text-eyebrow text-[var(--color-text-muted)] mb-3">
                PROBLEM
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">
                {project.problem}
              </p>
            </div>
          </ScrollReveal>
        )}

        {project.tech && project.tech.length > 0 && (
          <ScrollReveal delay={0.16} distance={16}>
            <div className="mb-8">
              <p className="text-eyebrow text-[var(--color-text-muted)] mb-3">
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
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.2} distance={16}>
          <div className="flex flex-wrap items-center gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn magnetic-btn-accent"
                data-cursor="VIEW"
              >
                <span>LIVE PROJECT →</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn"
                data-cursor="OPEN"
              >
                <span>GITHUB ↗</span>
              </a>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Right Column */}
      <div className="md:col-span-6 md:col-start-7 pt-2 md:pt-0 flex flex-col justify-between">
        
        <div>
          {project.highlights && project.highlights.length > 0 && (
            <ScrollReveal delay={0.08} distance={16}>
              <div className="mb-10">
                <p className="text-eyebrow text-[var(--color-text-muted)] mb-5">
                  WHAT I BUILT
                </p>
                <div className="grid grid-cols-1 gap-[1px] bg-[var(--color-border)]">
                  {project.highlights.map((h, i) => (
                    <div
                      key={h}
                      className="bg-[var(--color-bg-primary)] p-5 md:p-6 grid grid-cols-[30px_1fr] items-start gap-2"
                    >
                      <span className="text-[10px] font-mono text-[var(--color-text-muted)] mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-medium text-[var(--color-text-secondary)] leading-relaxed">
                        {h}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {project.implementation && project.implementation.length > 0 && (
            <ScrollReveal delay={0.12} distance={16}>
              <div>
                <p className="text-eyebrow text-[var(--color-text-muted)] mb-5">
                  TECHNICAL IMPLEMENTATION
                </p>
                <ul className="space-y-4">
                  {project.implementation.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[var(--color-text-tertiary)] leading-relaxed grid grid-cols-[20px_1fr] items-start"
                    >
                      <span className="text-[var(--color-accent)] mt-1.5 text-[6px]">
                        ●
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}
        </div>

      </div>
    </div>
  </div>
);

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="py-24 md:py-36 relative"
      aria-label="Selected Work"
    >
      <div className="wide-grid">
        <ScrollReveal direction="right" distance={8}>
          <p className="text-eyebrow text-[var(--color-text-muted)] mb-4">SELECTED WORK</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ParallaxLayer speed={0.04}>
            <h2 className="text-h0 text-[var(--color-text-primary)] mb-4">
              SELECTED WORK
            </h2>
          </ParallaxLayer>
        </ScrollReveal>

        <ScrollReveal delay={0.15} distance={20}>
          <p className="text-body text-lg mb-16 md:mb-24 max-w-xl">
            Systems, applications and experiments I&apos;ve built.
          </p>
        </ScrollReveal>

        {/* Render all projects uniformly */}
        {projects.map((project, i) => (
          <ScrollReveal key={project.id} delay={Math.min(0.2 + i * 0.1, 0.5)} distance={28}>
            <UnifiedProjectLayout project={project} isFeatured={project.layout === "featured"} />
          </ScrollReveal>
        ))}

        <div className="border-t border-[var(--color-border)]" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
    </section>
  );
}
