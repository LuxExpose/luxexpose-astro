/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        luxury: {
          gold: "hsl(var(--luxury-gold))",
          "gold-light": "hsl(var(--luxury-gold-light))",
          "gold-dark": "hsl(var(--luxury-gold-dark))",
          champagne: "hsl(var(--luxury-champagne))",
          bronze: "hsl(var(--luxury-bronze))",
          red: "hsl(var(--luxury-red))",
          burgundy: "hsl(var(--luxury-burgundy))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};