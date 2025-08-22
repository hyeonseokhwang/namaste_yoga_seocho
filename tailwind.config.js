/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7f9',
          100: '#e4edf2',
          200: '#c7d9e3',
          300: '#a9c5d4',
          400: '#7fa9be',
          500: '#568da8',
          600: '#3b6f89',
          700: '#2b5a72',
          800: '#1e4454',
          900: '#132c36',
        },
        accent: {
          50: '#fff6ed',
          100: '#ffebd6',
            200: '#ffd4ad',
            300: '#ffb87a',
            400: '#ff9c47',
            500: '#f97f12',
            600: '#dd6508',
            700: '#b74d06',
            800: '#8f3908',
            900: '#662605',
        },
        neutral: {
          50: '#f6f7f8',
          100: '#eceff1',
          200: '#d9dee2',
          300: '#c3cbd1',
          400: '#9aa6b1',
          500: '#6f7d89',
          600: '#52606d',
          700: '#3c4853',
          800: '#27323c',
          900: '#131c23',
        }
      }
    },
  },
  plugins: [],
};
