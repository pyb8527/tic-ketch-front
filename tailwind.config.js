/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: { colors: {
    bg: '#0f1117', surface: '#1a1d27', accent: '#6c63ff', accent2: '#00d4aa',
    danger: '#ff6b6b', warn: '#ffd93d'
  } } },
  plugins: [],
};
