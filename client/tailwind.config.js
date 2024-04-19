/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import { transform } from "typescript";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f0f0f",
        secondary: "#222",
        hover: "#3f3f3e00",
        sub: "#fff",
        error: colors.red[500],
      },
      fontFamily: {
        default: '"Merriweather", serif',
      },
    },
  },
  plugins: [],
};
