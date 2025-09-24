import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT:'#0ea5e9', dark:'#0369a1' }
      },
      boxShadow: {
        glow: '0 10px 40px rgba(14,165,233,0.25)'
      }
    }
  },
  plugins: [],
} satisfies Config
