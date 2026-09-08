import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/capabilities", destination: "/#capabilities", permanent: false },
      { source: "/education", destination: "/#education", permanent: false },
      { source: "/journey", destination: "/#journey", permanent: false },
      { source: "/credentials", destination: "/#credentials", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
