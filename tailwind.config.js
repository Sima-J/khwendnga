module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tBlue: '#243c5a',
        darkPurple: '#674471',
        normalPurple: '#8946A6',
        lightPurple: '#B762C1',
        blue: '#A8ECE7',
        yellow: '#FDFF8F',
        white: '#FFFFFF',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'rotate-img': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-90deg)' },
          '50%': { transform: 'rotate(-180deg)' },
          '75%': { transform: 'rotate(-270deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 13s linear infinite',
        'rotate-img': 'rotate-img 13s linear infinite',
      },

      backgroundImage: {
        heroLogin: "url('./assets/bannerLogin.png')",
        chatIcon: "url('./assets/disscuss.svg')",
        heroCourse: "url('./assets/students.jpg')",
      },
    },
  },
  plugins: [],
};
