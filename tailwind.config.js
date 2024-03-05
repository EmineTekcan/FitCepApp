/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "main-color":"#21971D",
        "second-color":"#FFB319",
        "bg-color":"#ffffff"
      }
    },
  },
  plugins: [],
}

