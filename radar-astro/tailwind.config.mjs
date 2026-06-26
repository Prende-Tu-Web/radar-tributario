/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'rt-navy': '#0f2547',
        'rt-red': '#c0392b',
        'rt-teal': '#22E0C4',
        'rt-warn': '#f59e0b',
        'rt-bg': '#f5f4f0',
        'rt-border': '#d4cfc8',
        'rt-text': '#1e293b',
        'rt-muted': '#64748b',
      },
      fontFamily: {
        heading: ['Rubik', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
