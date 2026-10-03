"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxLayer } from "@/components/ScrollParallax";
import { education, educationDegree } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-36 relative" aria-label="Education">
      <div className="wide-grid">
        <ScrollReveal direction="right" distance={8}>
          <p className="text-eyebrow text-[var(--color-text-muted)] mb-4">EDUCATION</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ParallaxLayer speed={0.04}>
            <h2 className="text-h1 text-[var(--color-text-primary)] mb-8">
              ACADEMIC FOUNDATION
            </h2>
          </ParallaxLayer>
        </ScrollReveal>

        {/* Degree & Institution Banner */}
        <ScrollReveal delay={0.15} distance={16}>
          <div className="p-7 md:p-8 mb-16 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-accent)] uppercase">
                  DEGREE
                </span>
                <span className="text-[var(--color-text-muted)]">·</span>
                <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">
                  {educationDegree.status}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                {educationDegree.degree}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {educationDegree.institution}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-[11px] font-mono text-[var(--color-text-secondary)]">
                {educationDegree.specialization}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {education.map((group, i) => (
            <ScrollReveal key={group.title} delay={0.15 + i * 0.1} distance={24}>
              <div>
                <p className="text-eyebrow text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-border)]">
                  {group.title}
                </p>
                <ul className="space-y-3">
                  {group.subjects.map((subject) => (
                    <li
                      key={subject}
                      className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3"
                    >
                      <span className="text-[var(--color-accent)] mt-1.5 text-[6px]">
                        ●
                      </span>
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
    </section>
  );
}
