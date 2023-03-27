/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#CC313D',
        'secondary': '#F7C5CC',
        'lightSecondary': '#FAE2E0'
      }
    },
  },
  plugins: [],
}
