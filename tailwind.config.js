/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        background: "#a7bcff",
        lighter: "#ddddf7",
        light: "#a7bcff",
        dark: "#5d5b8d",
        primary: "#7b96ec",
        primaryLight: "#8da4f1",
        secondary: "#AFAFAF",
        darker: "#3e3c61",
        darkest: "#2f2d52"
      },
      flex: {
        '2': '2 2 0%'
      },
      fontSize: {
        'xxs': '0.625rem'
      }
    },
  },
  plugins: [],
}

