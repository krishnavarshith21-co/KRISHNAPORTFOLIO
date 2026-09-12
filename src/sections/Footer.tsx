"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10" role="contentinfo">
      <div className="wide-grid">
        <ScrollReveal distance={16} duration={0.6}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Brand */}
            <div>
              <p className="text-sm font-black tracking-[0.2em] text-[var(--color-text-primary)] mb-1">
                KV
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Krishna Varshith · AI Engineer · Software Engineer
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.12em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                GITHUB
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.12em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                LINKEDIN
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="text-[10px] tracking-[0.12em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                EMAIL
              </a>
              <p className="text-[10px] text-[var(--color-text-muted)]">
                © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
