import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Include pages
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Include components
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Include app directory (for App Router)
    './public/**/*.html', // Include public files (if needed)
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'], // Default sans font
        mono: ['var(--font-geist-mono)'], // Default mono font
        'dm-sans': ['var(--font-dm-sans)'], // Custom font
        heading: ['var(--font-geist-sans)'], // Font for headings
      },
      colors: {
        primary: '#01DF73', // Add your primary color (Embus theme color)
        background: '#F7FFF2', // Add your background color
      },
    },
  },
  plugins: [],
};

export default config;