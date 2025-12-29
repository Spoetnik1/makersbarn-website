import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Playfair Display', 'Times New Roman', 'serif'],
      },
      colors: {
        brand: {
          green: '#294b3a',
          gold: '#b8894a',
          cream: '#f7f3ee',
          dark: '#1f130c',
        },
      },
    },
  },
  plugins: [],
}

export default config
