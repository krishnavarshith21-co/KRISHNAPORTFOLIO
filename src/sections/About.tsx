"use client";

import ScrollReveal from "@/components/ScrollReveal";

const focusAreas = [
  "Artificial Intelligence",
  "Cybersecurity",
  "Software Engineering",
  "Computer Vision",
  "LLM Applications",
  "Backend Development",
  "Full-Stack Development",
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24 relative" aria-label="About">
      <div className="container-grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left — Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="section-number mb-6">ABOUT</p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2 className="text-h1 text-[var(--color-text-primary)] mb-12">
                ENGINEER. BUILDER.
                <br />
                STUDENT.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-2xl">
                I&apos;m Krishna Varshith, a student engineer interested in
                artificial intelligence, cybersecurity, software systems and
                product development.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-body max-w-2xl">
                My work focuses on understanding difficult technical problems,
                building working systems and continuously learning through
                projects, hackathons and experimentation.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — Focus Areas Panel */}
          <div className="lg:col-span-4 lg:col-start-9">
            <ScrollReveal delay={0.2}>
              <div className="border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-primary)] mb-8 uppercase">
                  Focus Areas
                </p>
                <div className="space-y-4">
                  {focusAreas.map((area) => (
                    <div
                      key={area}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {area}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
    </section>
  );
}
