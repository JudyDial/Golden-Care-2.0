import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Referencing CSS variables
        foreground: "var(--foreground)", // Referencing CSS variables
        primary: {
          DEFAULT: "#4f46e5", // Primary button background
          foreground: "#ffffff", // Primary button text
        },
        destructive: {
          DEFAULT: "#e11d48", // Destructive button background
          foreground: "#ffffff", // Destructive button text
        },
        secondary: {
          DEFAULT: "#3b82f6", // Secondary button background
          foreground: "#ffffff", // Secondary button text
        },
        accent: {
          DEFAULT: "#facc15", // Accent hover background
          foreground: "#1e293b", // Accent hover text
        },
        input: "#d1d5db", // Outline button border
        ring: "#3b82f6", // Focus ring color
      },
    }
  },
  plugins: [],
} satisfies Config;
