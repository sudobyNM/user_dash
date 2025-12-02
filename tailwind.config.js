/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ui: {
          bg: "#d6eaffff",          // main background
          card: "#d1e6ffff",        // cards
          border: "#E5E7EB",      // gray-200
          text: "#111827",        // gray-900
          textLight: "#6B7280",   // gray-500
        },
      },
      borderRadius: {
        xl: "14px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
