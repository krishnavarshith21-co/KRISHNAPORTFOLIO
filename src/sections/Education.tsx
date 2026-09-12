"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxLayer } from "@/components/ScrollParallax";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-36 relative" aria-label="Education">
      <div className="wide-grid">
        <ScrollReveal direction="right" distance={8}>
          <p className="text-eyebrow text-[var(--color-text-muted)] mb-4">EDUCATION</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ParallaxLayer speed={0.04}>
            <h2 className="text-h1 text-[var(--color-text-primary)] mb-16">
              ACADEMIC FOUNDATION
            </h2>
          </ParallaxLayer>
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
