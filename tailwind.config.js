/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ["montserrat", "sans-serif"],
        pop: ["poppins", "sans-serif"],
      },
      backgroundImage: {
        signup: "url('./Assets/Images/pexels-valentinantonucci-1275393.jpg')",
        upload: "url('./Assets/Images/pexels-leah-newhouse-50725-185933.jpg')",
        contact: "url('./Assets/Images/pexels-jmark-32307.jpg')",
        services: "url('./Assets/Images/pexels-pixabay-327540.jpg')",
      },
      backgroundSize: ({ theme }) => ({
        auto: "auto",
        cover: "cover",
        contain: "contain",
        ...theme("spacing"),
      }),
      colors: {
        primary: "#4f46e5",
        secondary: "#3b82f6",
      },
    },
    plugins: [],
  },
};
