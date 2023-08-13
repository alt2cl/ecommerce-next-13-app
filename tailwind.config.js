/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["var(--font-barlow)"],
      },
      fontSize: {
        header: "2.25rem",
        sub: "1.25rem",
        paragraph: "1rem",
        description: "1.2rem",
      },
      fontColor: {
        grayFont: "#ccc",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          50: "#fff7cd",
          100: "#feef9b",
          200: "#fee669",
          300: "#fdde37",
          400: "#fdd605", //original
          500: "#e4c105",
          600: "#caab04",
          700: "#b19604",
          800: "#988003",
          900: "#7f6b03",
        },
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
