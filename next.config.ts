import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Impede o `next dev` de recriar o bloco de instruções para agentes de IA no AGENTS.md */
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
