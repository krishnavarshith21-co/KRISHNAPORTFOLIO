"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxLayer } from "@/components/ScrollParallax";
import { socialLinks } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 relative" aria-label="Contact">
      <div className="wide-grid">
        <ScrollReveal direction="right" distance={8}>
          <p className="section-number mb-4">CONTACT</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          {/* Left — Headline */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <ParallaxLayer speed={0.04}>
                <h2 className="text-h0 text-[var(--color-text-primary)] mb-6">
                  LET&apos;S BUILD
                  <br />
                  SOMETHING
                  <br />
                  THAT MATTERS.
                </h2>
              </ParallaxLayer>
            </ScrollReveal>

            <ScrollReveal delay={0.15} distance={20}>
              <p className="text-body text-lg max-w-lg mb-6">
                I&apos;m open to internships, engineering opportunities,
                technical collaborations and interesting projects.
              </p>
            </ScrollReveal>

            {/* Availability badges */}
            <ScrollReveal delay={0.2} distance={20}>
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
            <ScrollReveal delay={0.25} distance={20}>
              <div className="flex flex-col gap-[1px]">
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="group flex items-center justify-between border-b border-[var(--color-border)] py-5 hover:border-[var(--color-border-accent)] transition-colors duration-300"
                  data-cursor="OPEN"
                >
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors mb-1">
                      EMAIL
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                      {socialLinks.email}
                    </p>
                  </div>
                  <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-all duration-300 group-hover:translate-x-1 text-sm">
                    →
                  </span>
                </a>

                <a
                  href="tel:+919121723108"
                  className="group flex items-center justify-between border-b border-[var(--color-border)] py-5 hover:border-[var(--color-border-accent)] transition-colors duration-300"
                  data-cursor="CALL"
                >
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors mb-1">
                      PHONE
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                      +91 91217 23108
                    </p>
                  </div>
                  <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-all duration-300 group-hover:translate-x-1 text-sm">
                    ↗
                  </span>
                </a>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-[var(--color-border)] py-5 hover:border-[var(--color-border-accent)] transition-colors duration-300"
                  data-cursor="OPEN"
                >
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors mb-1">
                      GITHUB
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                      @krishnavarshith21-co
                    </p>
                  </div>
                  <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-all duration-300 group-hover:translate-x-1 text-sm">
                    ↗
                  </span>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-5 hover:border-[var(--color-border-accent)] transition-colors duration-300"
                  data-cursor="OPEN"
                >
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors mb-1">
                      LINKEDIN
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                      Connect
                    </p>
                  </div>
                  <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-all duration-300 group-hover:translate-x-1 text-sm">
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
