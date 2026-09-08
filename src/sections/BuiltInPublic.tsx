"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxLayer } from "@/components/ScrollParallax";
import { repositories, socialLinks } from "@/lib/data";

export default function BuiltInPublic() {
  return (
    <section className="py-20 md:py-28 relative bg-[var(--color-bg-secondary)]" aria-label="GitHub Repositories">
      <div className="content-grid">
        <ScrollReveal direction="right" distance={8}>
          <p className="section-number mb-4">GITHUB</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ParallaxLayer speed={0.04}>
            <h2 className="text-h1 text-[var(--color-text-primary)] mb-12">
              SELECTED REPOSITORIES
            </h2>
          </ParallaxLayer>
        </ScrollReveal>

        {/* Repository grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--color-border)] mb-10">
          {repositories.map((repo, i) => (
            <ScrollReveal key={repo.name} delay={Math.min(0.15 + i * 0.08, 0.4)} distance={24}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[var(--color-bg-secondary)] p-5 md:p-6 hover:bg-[var(--color-bg-primary)] transition-colors duration-200 group h-full card-hover"
                data-cursor="OPEN"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold tracking-wide text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {repo.name}
                  </p>
                  <span className="text-[9px] tracking-[0.15em] text-[var(--color-bg-primary)] bg-[var(--color-text-muted)] px-2 py-0.5 uppercase font-bold">
                    {repo.language}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed mb-4">
                  {repo.description}
                </p>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                  VIEW SOURCE ↗
                </p>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.25}>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold tracking-[0.15em] text-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors"
            data-cursor="OPEN"
          >
            ALL REPOSITORIES ON GITHUB ↗
          </a>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
    </section>
  );
}
