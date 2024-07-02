/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js,html}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#121212",
        seconadry: "#222222",
        cta: "#0092ca",
      },
      textColor: {
        primary: "#0092ca",
        seconadry: "#f2f2f2",
      },
      fontFamily: {
        poppins: "Poppins,Tahoma,sans-serif",
        monoton: "Monoton,Poppins,Tahoma,sans-serif",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
