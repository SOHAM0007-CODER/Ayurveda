/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linen: '#FDFBF7',
        botanical: '#233D2D',
        sage: '#6E8569',
        terracotta: '#B85B35',
        sand: '#F5F1E8',
        charcoal: '#2B2927',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        'organic': '32px 8px 32px 8px',
        'organic-alt': '8px 32px 8px 32px',
        'organic-soft': '24px 6px 24px 6px',
      },
      boxShadow: {
        'organic': '0 8px 30px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
