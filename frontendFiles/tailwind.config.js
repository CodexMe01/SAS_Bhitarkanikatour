/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lexend-giga': ['Lexend Giga', 'sans-serif'],
        'amaranth': ['Amaranth', 'sans-serif'],
        'lt-highlight': ['LT Highlight', 'Arial Black', 'Helvetica', 'sans-serif'],
      },
      colors: {
        'bhitarkanika-green': '#6C733D',
        'bhitarkanika-light-green': '#6B8E4A',
        'bhitarkanika-olive': '#9CA65D',
        'bhitarkanika-beige': '#F5F0E8',
        'bhitarkanika-yellow': '#F0F5E8',
        'bhitarkanika-dark': '#2C2C2C',
        'bhitarkanika-footer': '#1A1A1A',
        'bhitarkanika-gray': '#F8F9FA',
        'bhitarkanika-text': '#2D2D2D',
        'bhitarkanika-light-gray': '#E5E5E5',
        'bhitarkanika-off-white': '#F2F2F2',
      },
    },
  },
  plugins: [],
}

