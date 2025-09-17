/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif'],
      },
      colors: {
        'background': '#0d1117',
        'card': '#161b22',
        'primary': '#58a6ff',
        'text-main': '#c9d1d9',
        'text-secondary': '#8b949e',
        'border-color': '#30363d',
      },
    },
  },
  plugins: [],
}