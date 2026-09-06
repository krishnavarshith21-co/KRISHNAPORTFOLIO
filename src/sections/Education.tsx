"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28 relative" aria-label="Education">
      <div className="container-grid">
        <ScrollReveal>
          <p className="section-number mb-4">EDUCATION</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="text-h1 text-[var(--color-text-primary)] mb-16">
            ACADEMIC FOUNDATION
          </h2>
        </ScrollReveal>

        {/* Dense matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[var(--color-border)]">
          {education.map((group, i) => (
            <ScrollReveal key={group.title} delay={0.1 + i * 0.06}>
              <div className="bg-[var(--color-bg-primary)] h-full">
                <div className="p-5 md:p-6 bg-[var(--color-bg-secondary)]">
                  <p className="text-xs font-bold tracking-[0.2em] text-[var(--color-text-primary)]">
                    {group.title}
                  </p>
                </div>
                <div className="p-5 md:p-6">
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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
    </section>
  );
}
