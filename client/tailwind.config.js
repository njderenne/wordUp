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
      pink: {
        light: '#ff7ce5',
        DEFAULT: '#ff49db',
        dark: '#ff16d1',
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
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
