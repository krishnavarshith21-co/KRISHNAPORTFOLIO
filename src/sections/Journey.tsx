"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { timeline } from "@/lib/data";

const typeColors: Record<string, string> = {
  BUILDING: "text-[var(--color-accent)]",
  HACKATHON: "text-[var(--color-text-primary)]",
  LEARNING: "text-[var(--color-text-secondary)]",
  WORKSHOP: "text-[var(--color-text-secondary)]",
};

export default function Journey() {
  return (
    <section id="journey" className="py-20 md:py-28 relative bg-[var(--color-bg-secondary)]" aria-label="Journey">
      <div className="container-grid">
        <ScrollReveal>
          <p className="section-number mb-4">JOURNEY</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="text-h1 text-[var(--color-text-primary)] mb-16">
            THE JOURNEY
          </h2>
        </ScrollReveal>

        <div>
          {timeline.map((entry, i) => (
            <ScrollReveal key={`${entry.title}-${i}`} delay={i * 0.04}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-[var(--color-border)] group">
                {/* Year */}
                <div className="md:col-span-1">
                  <p className="text-xs font-mono text-[var(--color-text-muted)]">
                    {entry.year}
                  </p>
                </div>

                {/* Type badge */}
                <div className="md:col-span-2">
                  <p className={`text-[10px] font-bold tracking-[0.15em] uppercase ${typeColors[entry.type] || "text-[var(--color-text-secondary)]"}`}>
                    {entry.type}
                  </p>
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {entry.title}
                  </p>
                </div>

                {/* Description + Evidence */}
                <div className="md:col-span-5">
                  <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">
                    {entry.description}
                  </p>
                  {entry.evidence && (
                    <a
                      href="#credentials"
                      className="inline-flex items-center gap-2 mt-4 text-[10px] font-medium tracking-[0.1em] text-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <span className="w-3 h-[1px] bg-current" />
                      {entry.evidence.label}
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
          {/* Final border */}
          <div className="border-t border-[var(--color-border)]" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
    </section>
  );
}
