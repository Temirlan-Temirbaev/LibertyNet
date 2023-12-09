/** @type {import('tailwindcss').Config} */
const {COLORS} = require("./shared/constants/styles/colors");
const {BORDERS} = require("./shared/constants/styles/borders");
module.exports = {
  content: ["./**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...COLORS
      },
      blur: {
        default: "15px"
      },
      border: {
        ...BORDERS
      },
      fontFamily : {
        "primary" : "Avenir"
      }
    },
  },
  plugins: [],
}

