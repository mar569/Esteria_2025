/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#aaf0d1',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        beige: {
          50: '#fefef7',
          100: '#fefbf3',
          200: '#fdf6e3',
          300: '#faebd7',
          400: '#f5deb3',
          500: '#f0d58c',
          600: '#e6c46b',
          700: '#d4af37',
          800: '#b8941f',
          900: '#967814',
        },
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0c4b7',
          400: '#d2b48c',
          500: '#bc9a6a',
          600: '#a0845c',
          700: '#8b7355',
          800: '#6c5935',
          900: '#5d4e37',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
