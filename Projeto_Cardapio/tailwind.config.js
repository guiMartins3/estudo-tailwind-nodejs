/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./styles/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        home: "url('../assets/bg-home.png')",
      },
    },
  },
  plugins: [],
};
