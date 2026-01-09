import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#252525",
          deep: "#1a1a1a",
        },
        'black-deep': '#1a1a1a',
        white: {
          DEFAULT: "#FFFFFF",
          off: "#f5f5f5",
        },
        gray: {
          DEFAULT: "#808080",
        },
      },
      fontFamily: {
        'pp-neue-montreal': ['var(--font-pp-neue-montreal)', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        normal: '400',
        medium: '500',
      },
    },
  },
  plugins: [],
};
export default config;

