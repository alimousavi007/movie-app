/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d1117",
        card: "#161b22",
        primary: "#58a6ff",
        text: {
          main: "#c9d1d9",
          secondary: "#8b949e",
        },
        border: {
          DEFAULT: "#30363d",
        },
      },
      fontFamily: {
        sans: ["Vazirmatn", "sans-serif"],
      },
    },
  },
  plugins: [],
}
