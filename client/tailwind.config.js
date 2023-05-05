/** @type {import('tailwindcss').Config} */

module.exports = {
  //add all template files in the content array
  content: [
    "./src/components/header/Header.jsx",
    "./src/components/footer/Footer.jsx",
    "./src/pages/home/Home.jsx",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      navbar: "#1F485B",
      mainBackground: "#E5E5E5",
      dark: "#434343",
      bodyCards: "#B8D2EA",
      about: "#F8FFFA",
      white: "#FFFFF",
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
