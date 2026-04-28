module.exports = {
  /** @type {import('tailwindcss').Config} */
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFC107',
          DEFAULT: '#D4A017',
          dark: '#B8860B',
        },
        secondary: {
          light: '#FFF9E6',
          DEFAULT: '#0b1f3a',
          dark: '#071628',
        },
        gold: '#FFC107',
        navy: '#0b1f3a',
        cyan: '#00b4d8',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
