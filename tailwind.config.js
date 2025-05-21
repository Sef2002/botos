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
        cream: '#E6DFD3',
        sand: '#D4C8B8',
        taupe: '#A69886',
        charcoal: '#2C2C2C',
      },
      backgroundColor: {
        cream: '#E6DFD3',
        sand: '#D4C8B8',
        taupe: '#A69886',
        charcoal: '#2C2C2C',
      },
      borderColor: {
        cream: '#E6DFD3',
        sand: '#D4C8B8',
        taupe: '#A69886',
        charcoal: '#2C2C2C',
      },
      textColor: {
        cream: '#E6DFD3',
        sand: '#D4C8B8',
        taupe: '#A69886',
        charcoal: '#2C2C2C',
      },
    },
  },
  plugins: [],
};