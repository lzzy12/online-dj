/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          secondary: {
            DEFAULT: "#E419E1",
            foreground: "#000000",
          },
          primary: {
            DEFAULT: "#1D2021",
            foreground: "#181A1B"
          },
          focus: "#BEF264",
        },
      },
    },
  })],
}

