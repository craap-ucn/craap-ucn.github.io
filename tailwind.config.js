/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'blue-ucn-header': '#003057',
        'blue-ucn-footer': '#23405B',
        'gray-hard-custom': '#808080',
        'gray-light-custom': '#E6E6E6',
        'orange-ucn': '#E7763D',
        'orange-dark-ucn': '#C05A2C',
      },
      fontFamily: {
        'arial-regular': ['Arial', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

