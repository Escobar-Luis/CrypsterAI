module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        '3xl': '1600px',
        'md': '768px'
      },
      backgroundImage: {
        'space': "url('./pages/dashboard/img/background.png')",},
      colors: {
        "theme-blue": "#5515ef",
        "theme-pink": "#3c01ca",
        "theme-blue-dark": "#eb589e",
        "theme-yellow": "#ffc727",
        "theme-yellow-dark": "#e6b323",
        "theme-dark": "#37474f",
        // 'pulsy':'#0E1135',
        gray: {
          600: "#9499C3",
        },
        yellow: {
          DEFAULT: "#FFD630",
        },
        red: {
          DEFAULT: "#E72D2D",
        },
        blue: {
          DEFAULT: "#298BFE",
          900: "#1A1C48",
        },
        green: {
          DEFAULT: "#79F74B",
        },
      },
      height: {
        'h-38': '38rem',
        "screen-75": "90vh",
        "screen-50": "50vh",
        
      },
      boxShadow: {
        "theme-1": "0 0 60px -15px rgba(0, 0, 0, 0.7)",
        "theme-2": "15px 0 35px -5px rgba(0, 0, 0, 0.5)",
      },
      fontSize: {
        xxxs: "0.6875em",
        xxs: "0.75rem",
        xs: "0.8125rem",
        "3xl": "2rem",
        "10xl": "10rem",
        "18xl": "18rem",
        "19xl": "19rem",
        "20xl": "20rem",
        "25xl": "25rem",
        "30xl": "30rem",
      },
      fontFamily: {
        main: ["'Open Sans'"],
        marker: ["'Montserrat'"],
        whole: ["'Fredoka'"]
        // sans: ["Lato", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      scale: ["active", "group-hover"],
    },
  },
  plugins: [],
};
