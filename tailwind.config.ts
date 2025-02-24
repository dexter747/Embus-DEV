import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        'dm-sans': ['var(--font-dm-sans)'],
        'heading': ['var(--font-geist-sans)'], // We'll use this for headings instead of Chillax
      },
    },
  },
  plugins: [],
}

export default config