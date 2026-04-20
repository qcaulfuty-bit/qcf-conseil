import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          soft: "#111111",
          muted: "#5A5A5A",
          line: "#E7E5E2",
        },
        paper: {
          DEFAULT: "#F6F5F1",
          pure: "#FAFAF8",
        },
        accent: {
          DEFAULT: "#7C8A9A",
          deep: "#2E3A46",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "ui-serif",
          "Georgia",
          "Cambria",
          "serif",
        ],
      },
      fontSize: {
        "display-xl": [
          "clamp(3.25rem, 8.5vw, 8rem)",
          { lineHeight: "0.95", letterSpacing: "-0.035em" },
        ],
        "display-lg": [
          "clamp(2.5rem, 6vw, 5.5rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
        "display-md": [
          "clamp(1.75rem, 3.6vw, 3rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        eyebrow: "0.22em",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
