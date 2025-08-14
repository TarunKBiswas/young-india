/* eslint-disable no-undef */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        themecolor: "var(--primary-color)",
        textcolor: "var(--text-color)",
        navBgColor: "var(--nav-bg-color)",
        navTextColor: "var(--nav-text-color)",
        promoBgColor: "var(--promo-bg-color)",
        promoTextColor: "var(--promo-text-color)",
      },
    },
    screens: {
      sm: "576px",
      md: "760px",
      lg: "991px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1620px",
      "4xl": "1900px",
      bigScreen: "1536px",
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/forms"),
    // require("@tailwindcss/line-clamp"),
  ],
};
