/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        md: "10rem",
      },
    },
  },
  plugins: [],
};
