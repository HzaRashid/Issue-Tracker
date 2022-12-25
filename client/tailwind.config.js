/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'opens': ['Open Sans', 'sans-serif'],
        'qsand': ['Quicksand', 'sans-serif'],
      }
    },
  },
  plugins: [  
    'postcss-import',
  'tailwindcss/nested',
  'tailwindcss',
  'autoprefixer',
],
}
