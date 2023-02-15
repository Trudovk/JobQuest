/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans", "ui-sans-serif"]
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#059669",
          "secondary": "#7dd3fc",
          "accent": "#064e3b",
          "neutral": "#5D5656",
          "base-100": "#E9E7E7",
          "info": "#3ABFF8",
          "success": "#16a34a",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
}
