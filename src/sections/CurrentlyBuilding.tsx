"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function CurrentlyBuilding() {
  return (
    <section className="relative border-t border-[var(--color-border)]" aria-label="Currently Building">
      <div className="wide-grid">
        <ScrollReveal delay={0.1} distance={20}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 group">
            <div className="flex items-center gap-5">
              {/* Live indicator */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
              </span>

              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] mb-0.5 uppercase">
                  Currently Building
                </p>
                <p className="text-sm font-bold text-[var(--color-text-primary)] transition-transform duration-300 group-hover:translate-x-[3px]">
                  MITRA VERIFY
                </p>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-tertiary)] max-w-md">
              API-first continuous identity verification. Building session-level
              identity security from first principles.
            </p>

            <span className="text-[9px] font-bold tracking-[0.2em] text-[var(--color-accent)] uppercase shrink-0 transition-transform duration-300 group-hover:-translate-x-1">
              BUILDING
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
