/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        darkblue: "var(--dark-blue)",
        customwhite: "var(--custom-white)",
        beige: "var(--beige)",
        customblue: "var(--custom-blue)",
        customturquoise: "var(--custom-turquoise)",
        customgreen: "var(--custom-green)",
        popupblue: "var(--popupblue)",
      },
    },
  },
  plugins: [],
};