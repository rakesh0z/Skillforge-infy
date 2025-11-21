/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f8ff',
          100: '#e8efff',
          200: '#c7d8ff',
          300: '#a5c0ff',
          400: '#6c93ff',
          500: '#3b66ff',
          600: '#2249db',
          700: '#1b3cae',
          800: '#142d82',
          900: '#0e205c',
        },
      },
    },
  },
  plugins: [],
}

