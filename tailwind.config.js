/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FAF2F4',
          100: '#F5E4E9',
          200: '#ECC7D2',
          300: '#DC9CB0',
          400: '#C76686',
          500: '#A52A55',
          600: '#8E1D45',
          700: '#751336',
          800: '#60112D',
          900: '#4D0E24',
          950: '#320616',
        },
        ivory: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F5EFEB',
          300: '#EFE7E0',
          400: '#DED1C5',
          500: '#C9B5A3',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'frosted': '0 8px 32px 0 rgba(77, 14, 36, 0.08)',
        'frosted-lg': '0 20px 50px 0 rgba(77, 14, 36, 0.15)',
        'glow': '0 0 40px -10px rgba(165, 42, 85, 0.35)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
