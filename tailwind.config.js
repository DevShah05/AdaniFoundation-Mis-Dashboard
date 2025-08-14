/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        adani: {
          blue: "#007BBD",
          green: "#A4C639",
          plum: "#6B1E82",
          pink: "#E6518B",
          bg: "#F7F9FC",
        },
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
