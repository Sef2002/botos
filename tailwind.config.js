/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        heading: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        gold: '#c7ad84',
        brand: '#1e293b', // The blue color from the logo
      },
      backgroundColor: {
        gold: '#c7ad84',
        brand: '#1e293b',
      },
      borderColor: {
        gold: '#c7ad84',
        brand: '#1e293b',
      },
      textColor: {
        gold: '#c7ad84',
        brand: '#1e293b',
      },
    },
  },
  plugins: [],
};