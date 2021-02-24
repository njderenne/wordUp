module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}, ./public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      blue: {
        light: '#85d7ff',
        DEFAULT: '#93C5FD',
        dark: '#1E40AF',
      },
      gray: {
        darkest: '#1f2d3d',
        dark: '#3c4858',
        DEFAULT: '#536878',
        light: '#e0e6ed',
        lightest: '#f9fafc',
      },
      purple: {
        dark: '#7C3AED',
        DEFAULT: '#A78BFA'
      },
      red: {
        DEFAULT: '#D13A37'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
