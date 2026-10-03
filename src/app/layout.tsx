import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishna Varshith Kamanaboina — AI/ML · Full-Stack Software · Cybersecurity",
  description:
    "Student engineer pursuing B.Tech in CSE (AI & Data Science), with hands-on experience building AI/ML applications, full-stack web applications, APIs, and security-focused software.",
  openGraph: {
    title: "Krishna Varshith Kamanaboina — AI/ML · Full-Stack Software · Cybersecurity",
    description:
      "Student engineer pursuing B.Tech in CSE (AI & Data Science), building AI/ML applications, full-stack web applications, and security-focused software.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Varshith Kamanaboina — AI/ML · Full-Stack Software · Cybersecurity",
    description:
      "Student engineer pursuing B.Tech in CSE (AI & Data Science), building AI/ML applications, full-stack web applications, and security-focused software.",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
