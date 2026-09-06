import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishna Varshith — AI Engineer & Software Engineer",
  description:
    "Krishna Varshith is a student engineer building intelligent systems, security-focused software and practical AI applications.",
  openGraph: {
    title: "Krishna Varshith — AI Engineer & Software Engineer",
    description:
      "Student engineer building intelligent systems, security-focused software and practical AI applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Varshith — AI Engineer & Software Engineer",
    description:
      "Building intelligent systems, security-focused software and practical AI applications.",
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
