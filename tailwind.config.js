/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF0000',
        'secondary': '#077b8a', //dark cyan
        'lightSecondary': '#00FFFF', //cyan
        'gold': '#FFD600',
        'blackPurple': '#0d1137' //purple
      },
      animation: {
        'slidedown': 'bounce 1s ease-in 1',
      }
    },
  },
  plugins: [],
}
