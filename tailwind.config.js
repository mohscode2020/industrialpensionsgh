/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Public Sans"', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'] },
      colors: {
        orange: { DEFAULT: '#F7901E', dark: '#C8620A', light: '#FFF3E6' },
        ink: { DEFAULT: '#141414', 2: '#262626' },
        page: '#F8F7F4',
        line: '#E7E4DE',
      },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
}
