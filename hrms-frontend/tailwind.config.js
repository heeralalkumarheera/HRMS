/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        techstile: {
          dark: '#1a1a2e',
          navy: '#16213e',
          teal: '#0f3460',
          accent: '#e94560',
        }
      }
    },
  },
  plugins: [],
}