/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#030712",
        foreground: "#f8fafc",
        card: {
          DEFAULT: "rgba(2, 6, 23, 0.5)",
          foreground: "#f8fafc",
        },
        primary: {
          DEFAULT: "#FF4ECD",
          foreground: "#020617",
        },
        secondary: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "#f8fafc",
        },
        accent: {
          DEFAULT: "#B3168A",
          foreground: "#f8fafc",
          pink: "#FFD6F4",
        },
        muted: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "#94a3b8",
        },
        border: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["'Rajdhani'", "sans-serif"],
        rajdhani: ["'Rajdhani'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "marquee-slow": "marquee 50s linear infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "200% 0" },
          "50%": { backgroundPosition: "-200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        }
      },
    },
  },
  plugins: [],
}
