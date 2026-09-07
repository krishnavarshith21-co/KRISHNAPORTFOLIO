"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxLayer } from "@/components/ScrollParallax";
import { socialLinks } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 relative" aria-label="Contact">
      <div className="container-grid">
        <ScrollReveal>
          <p className="section-number mb-4">CONTACT</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Left — Headline */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.06}>
              <ParallaxLayer speed={0.04}>
                <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-black tracking-tight leading-[0.95] text-[var(--color-text-primary)] mb-6">
                  LET&apos;S BUILD
                  <br />
                  SOMETHING
                  <br />
                  THAT MATTERS.
                </h2>
              </ParallaxLayer>
            </ScrollReveal>

            <ScrollReveal delay={0.12} distance={24}>
              <p className="text-body text-lg max-w-lg mb-6">
                I&apos;m open to internships, engineering opportunities,
                technical collaborations and interesting projects.
              </p>
            </ScrollReveal>

            {/* Availability badges */}
            <ScrollReveal delay={0.18} distance={20}>
              <div className="flex flex-wrap gap-3">
                {["OPEN TO INTERNSHIPS", "ENGINEERING OPPORTUNITIES", "TECHNICAL COLLABORATIONS"].map((badge) => (
                  <span
                    key={badge}
                    className="text-[9px] font-bold tracking-[0.12em] text-[var(--color-accent)] border border-[var(--color-border-accent)] px-3 py-1.5 uppercase"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Links */}
          <div className="lg:col-span-4 lg:col-start-9">
            <ScrollReveal delay={0.2} distance={24}>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="group flex items-center justify-between border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 hover:bg-[var(--color-text-primary)] transition-colors duration-200 card-hover"
                  data-cursor="OPEN"
                >
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-primary)] group-hover:text-[var(--color-bg-primary)] transition-colors">
                      EMAIL
                    </p>
                    <p className="text-[11px] font-mono text-[var(--color-text-muted)] group-hover:text-[var(--color-bg-primary)]/70 mt-1 transition-colors">
                      {socialLinks.email}
                    </p>
                  </div>
                  <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-bg-primary)] transition-colors text-sm">
                    →
                  </span>
                </a>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 hover:bg-[var(--color-text-primary)] transition-colors duration-200 card-hover"
                  data-cursor="OPEN"
                >
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-primary)] group-hover:text-[var(--color-bg-primary)] transition-colors">
                      GITHUB
                    </p>
                    <p className="text-[11px] font-mono text-[var(--color-text-muted)] group-hover:text-[var(--color-bg-primary)]/70 mt-1 transition-colors">
                      @krishnavarshith21-co
                    </p>
                  </div>
                  <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-bg-primary)] transition-colors text-sm">
                    ↗
                  </span>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 hover:bg-[var(--color-text-primary)] transition-colors duration-200 card-hover"
                  data-cursor="OPEN"
                >
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-primary)] group-hover:text-[var(--color-bg-primary)] transition-colors">
                      LINKEDIN
                    </p>
                    <p className="text-[11px] font-mono text-[var(--color-text-muted)] group-hover:text-[var(--color-bg-primary)]/70 mt-1 transition-colors">
                      Connect
                    </p>
                  </div>
                  <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-bg-primary)] transition-colors text-sm">
                    ↗
                  </span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
