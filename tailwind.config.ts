import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#06080b",
          900: "#0b0e13",
          850: "#10141a",
          800: "#151a22",
          700: "#1e2530",
        },
        paper: "#e7ecf1",
        mute: "#8590a0",
        mint: { DEFAULT: "#6ee7c8", soft: "#a7f3df", deep: "#2dd4bf" },
        sky: { DEFAULT: "#7aa2ff" },
        coral: { DEFAULT: "#ff7a6b" },
      },
      fontFamily: {
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        display: ['"Bricolage Grotesque Variable"', '"Inter Variable"', "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      maxWidth: { shell: "74rem" },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        ping2: {
          "0%": { boxShadow: "0 0 0 0 rgba(110,231,200,.5)" },
          "70%": { boxShadow: "0 0 0 10px rgba(110,231,200,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(110,231,200,0)" },
        },
      },
      animation: { blink: "blink 1s steps(1) infinite", ping2: "ping2 2s ease-out infinite" },
    },
  },
  plugins: [],
};
export default config;
