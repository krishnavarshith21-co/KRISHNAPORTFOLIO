"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxLayer } from "@/components/ScrollParallax";
import { capabilities } from "@/lib/data";

export default function Skills() {
  return (
    <section
      id="capabilities"
      className="py-24 md:py-36 relative"
      aria-label="Technical Capabilities"
    >
      <div className="wide-grid">
        <ScrollReveal direction="right" distance={8}>
          <p className="text-eyebrow text-[var(--color-text-muted)] mb-4">TECHNICAL CAPABILITIES</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ParallaxLayer speed={0.04}>
            <h2 className="text-h1 text-[var(--color-text-primary)] mb-16">
              TECHNOLOGIES
            </h2>
          </ParallaxLayer>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {capabilities.map((category, i) => (
            <ScrollReveal key={category.title} delay={0.15 + i * 0.1} distance={24}>
              <div>
                {/* Category header */}
                <p className="text-eyebrow text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-border)]">
                  {category.title}
                </p>
                {/* Items */}
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3"
                    >
                      <span className="text-[var(--color-accent)] mt-1.5 text-[6px]">
                        ●
                      </span>
                      {item}
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
