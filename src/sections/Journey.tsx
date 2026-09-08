"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxLayer } from "@/components/ScrollParallax";
import { timeline } from "@/lib/data";

const typeColors: Record<string, string> = {
  BUILDING: "text-[var(--color-accent)]",
  ACHIEVEMENT: "text-[var(--color-accent)] drop-shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.3)]",
  HACKATHON: "text-[var(--color-text-primary)]",
  LEARNING: "text-[var(--color-text-secondary)]",
  WORKSHOP: "text-[var(--color-text-secondary)]",
};

export default function Journey() {
  return (
    <section id="journey" className="py-20 md:py-28 relative bg-[var(--color-bg-secondary)]" aria-label="Journey">
      <div className="content-grid">
        <ScrollReveal direction="right" distance={8}>
          <p className="section-number mb-4">JOURNEY</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ParallaxLayer speed={0.04}>
            <h2 className="text-h1 text-[var(--color-text-primary)] mb-16">
              THE JOURNEY
            </h2>
          </ParallaxLayer>
        </ScrollReveal>

        <div>
          {timeline.map((entry, i) => {
            const isAchievement = entry.type === "ACHIEVEMENT";
            return (
              <ScrollReveal key={`${entry.title}-${i}`} delay={Math.min(i * 0.1, 0.3)} distance={20}>
                <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-[var(--color-border)] transition-colors duration-300 group ${isAchievement ? "hover:bg-[var(--color-bg-primary)] -mx-4 px-4 rounded-sm" : ""}`}>
                  {/* Year */}
                  <div className="md:col-span-1">
                    <p className={`text-xs font-mono ${isAchievement ? "text-[var(--color-accent)]/80" : "text-[var(--color-text-muted)]"}`}>
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
                    <p className={`text-sm font-medium ${isAchievement ? "text-white group-hover:text-[var(--color-accent)] transition-colors" : "text-[var(--color-text-primary)]"}`}>
                      {entry.title}
                    </p>
                  </div>

                  {/* Description + Evidence */}
                  <div className="md:col-span-5 relative">
                    <p className={`text-sm leading-relaxed ${isAchievement ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-tertiary)]"}`}>
                      {entry.description}
                    </p>
                    {entry.evidence && (
                      <a
                        href="#credentials"
                        className={`inline-flex items-center gap-2 mt-4 text-[10px] font-medium tracking-[0.1em] transition-colors ${isAchievement ? "text-[var(--color-accent)] hover:text-white" : "text-[var(--color-accent)] hover:text-[var(--color-text-primary)]"}`}
                      >
                        <span className="w-3 h-[1px] bg-current" />
                        {entry.evidence.label}
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
          {/* Final border */}
          <div className="border-t border-[var(--color-border)]" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
    </section>
  );
}
