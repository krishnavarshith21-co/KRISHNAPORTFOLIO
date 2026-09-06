"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { capabilities } from "@/lib/data";

export default function Skills() {
  return (
    <section
      id="capabilities"
      className="py-20 md:py-28 relative"
      aria-label="Technical Capabilities"
    >
      <div className="container-grid">
        <ScrollReveal>
          <p className="section-number mb-4">TECHNICAL CAPABILITIES</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="text-h1 text-[var(--color-text-primary)] mb-12">
            TECHNOLOGIES
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[var(--color-border)]">
          {capabilities.map((category, i) => (
            <ScrollReveal key={category.title} delay={0.1 + i * 0.06}>
              <div className="bg-[var(--color-bg-primary)] h-full">
                {/* Category header */}
                <div className="p-5 md:p-6 bg-[var(--color-bg-secondary)]">
                  <p className="text-xs font-bold tracking-[0.2em] text-[var(--color-text-primary)]">
                    {category.title}
                  </p>
                </div>
                {/* Items */}
                <div className="p-5 md:p-6">
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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
    </section>
  );
}
