const plugin = require("tailwindcss/plugin")
const colors = require("tailwindcss/colors")
const { parseColor } = require("tailwindcss/lib/util/color")

const toRGB = value => {
  return parseColor(value).color.join(" ")
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      screens: {
        "3xl": "1600px",
      },
      colors: {
        theme: {
          1: "rgb(var(--color-theme-1) / <alpha-value>)",
          2: "rgb(var(--color-theme-2) / <alpha-value>)",
        },
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        pending: "rgb(var(--color-pending) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        darkmode: {
          50: "rgb(var(--color-darkmode-50) / <alpha-value>)",
          100: "rgb(var(--color-darkmode-100) / <alpha-value>)",
          200: "rgb(var(--color-darkmode-200) / <alpha-value>)",
          300: "rgb(var(--color-darkmode-300) / <alpha-value>)",
          400: "rgb(var(--color-darkmode-400) / <alpha-value>)",
          500: "rgb(var(--color-darkmode-500) / <alpha-value>)",
          600: "rgb(var(--color-darkmode-600) / <alpha-value>)",
          700: "rgb(var(--color-darkmode-700) / <alpha-value>)",
          800: "rgb(var(--color-darkmode-800) / <alpha-value>)",
          900: "rgb(var(--color-darkmode-900) / <alpha-value>)",
        },
      },
      fontFamily: {
        "public-sans": ["Public Sans"],
        "dm-sans": ["DM Sans"],
        montserrat: ["Montserrat"],
        poppins: ["Poppins"],
        inter: ["Inter"],
      },
      backgroundImage: {
        "texture-black":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2346.899' height='1200.894' viewBox='0 0 2346.899 1200.894'%3E%3Cg id='Group_369' data-name='Group 369' transform='translate(-33.74 508.575)'%3E%3Cg id='Group_366' data-name='Group 366' transform='translate(33.74 -458.541)'%3E%3Crect id='Rectangle_492' data-name='Rectangle 492' width='745.289' height='650.113' transform='matrix(0.978, 0.208, -0.208, 0.978, 296.729, 261.648)' fill='rgba(30,41,59,0.01)'/%3E%3Crect id='Rectangle_491' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(30,41,59,0.01)'/%3E%3C/g%3E%3Cg id='Group_367' data-name='Group 367' transform='translate(1647.456 1026.688) rotate(-128)'%3E%3Crect id='Rectangle_492-2' data-name='Rectangle 492' width='745.289' height='650.113' transform='matrix(0.978, 0.208, -0.208, 0.978, 296.729, 261.648)' fill='rgba(30,41,59,0.01)'/%3E%3Crect id='Rectangle_491-2' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(30,41,59,0.01)'/%3E%3C/g%3E%3Cg id='Group_368' data-name='Group 368' transform='matrix(-0.656, -0.755, 0.755, -0.656, 1017.824, 1042.94)'%3E%3Crect id='Rectangle_492-3' data-name='Rectangle 492' width='745.289' height='650.113' transform='matrix(0.978, 0.208, -0.208, 0.978, 296.729, 261.648)' fill='rgba(30,41,59,0.01)'/%3E%3Crect id='Rectangle_491-3' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(30,41,59,0.01)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A\")",
        "texture-white":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2346.899' height='1200.894' viewBox='0 0 2346.899 1200.894'%3E%3Cg id='Group_369' data-name='Group 369' transform='translate(-33.74 508.575)'%3E%3Cg id='Group_366' data-name='Group 366' transform='translate(33.74 -458.541)'%3E%3Crect id='Rectangle_492' data-name='Rectangle 492' width='745.289' height='650.113' transform='translate(296.729 261.648) rotate(12.007)' fill='rgba(255,255,255,0.01)'/%3E%3Crect id='Rectangle_491' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(255,255,255,0.01)'/%3E%3C/g%3E%3Cg id='Group_367' data-name='Group 367' transform='translate(1647.456 1026.688) rotate(-128)'%3E%3Crect id='Rectangle_492-2' data-name='Rectangle 492' width='745.289' height='650.113' transform='translate(296.729 261.648) rotate(12.007)' fill='rgba(255,255,255,0.01)'/%3E%3Crect id='Rectangle_491-2' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(255,255,255,0.01)'/%3E%3C/g%3E%3Cg id='Group_368' data-name='Group 368' transform='matrix(-0.656, -0.755, 0.755, -0.656, 1017.824, 1042.94)'%3E%3Crect id='Rectangle_492-3' data-name='Rectangle 492' width='745.289' height='650.113' transform='translate(296.729 261.648) rotate(12.007)' fill='rgba(255,255,255,0.01)'/%3E%3Crect id='Rectangle_491-3' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(255,255,255,0.01)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A\")",
        "chevron-white":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff95' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
        "chevron-black":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2300000095' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--color-theme-1": toRGB(colors.sky["700"]),
          "--color-theme-2": toRGB(colors.rose["800"]),
          "--color-primary": toRGB(colors.sky["700"]),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.teal["600"]),
          "--color-info": toRGB(colors.cyan["600"]),
          "--color-warning": toRGB(colors.yellow["600"]),
          "--color-pending": toRGB(colors.orange["700"]),
          "--color-danger": toRGB(colors.red["700"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),
        },
      })
    }),
  ],
}
