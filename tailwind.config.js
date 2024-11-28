/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          geist: ["Geist"],
          geistmono: ["Geist Mono"],
      },
  },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}