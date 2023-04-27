module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      "1/2": "50%",
    },
    maxWidth: {
      "1/2": "50%",
    },
    extend: {
      screens: {
        md: "768px",
        sd: "640px",
      },
      left: {
        "20%": "20%",
      },
      colors: {
        tBlue: "#243c5a",
        darkPurple: "#440e52",
        normalPurple: "#8946A6",
        lightPurple: "#B762C1",
        blue: "#A8ECE7",
        yellow: "#e8e217",
        white: "#FFFFFF",
        tGray: "#f9f6f6",
        red: " #ff4040",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "rotate-img": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-90deg)" },
          "50%": { transform: "rotate(-180deg)" },
          "75%": { transform: "rotate(-270deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 13s linear infinite",
        "rotate-img": "rotate-img 13s linear infinite",
      },

      backgroundImage: {
        heroLogin: "url('./assets/bannerLogin.png')",
        chatIcon: "url('./assets/disscuss.svg')",
        chatBanner: "url('./assets/chatBanner.svg')",
        gradeBanner: "url('./assets/gradeBanner.svg')",
        heroCourse: "url('./assets/students.jpg')",
      },
    },
  },
  plugins: [],
};
