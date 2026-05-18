import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#111111",
        "surface-2": "#1a1a1a",
        border: "#1f1f1f",
        accent: "#e8c84a",
        "accent-dim": "#b09a35",
        muted: "#6b6b6b",
        foreground: "#f0ece4",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        prose: ["var(--font-lora)", "Georgia", "serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#f0ece4",
            a: { color: "#e8c84a", "&:hover": { color: "#b09a35" } },
            h1: { color: "#f0ece4" },
            h2: { color: "#f0ece4" },
            h3: { color: "#f0ece4" },
            strong: { color: "#f0ece4" },
            blockquote: { borderLeftColor: "#e8c84a", color: "#c0bab2" },
            code: { color: "#e8c84a" },
            "pre code": { color: "#f0ece4" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
