/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        280: "280px"
      },
      height: {
        280: "280px"
      },
      padding: {
        200: "200px",
      },
      colors: {
        primary: "#E16246",
        secondary: "#E83434",
        divider: "#ABABAB",
        'header': '#D9D9D9',
        'nav-item': 'rgba(0, 0, 0, 0.42)',
        'placeholder': 'rgba(0, 0, 0, 0.25)',
      },
      fontSize: {
        '13': ['13px', '13px'],
        '15': '15px',
        '20': '20px',
        '25': '25px',
        '28': '28px',
        '32': ['32px', '36px'],
        '34': "34px",
        '40': "40px"
      },
      boxShadow: {
        'circle': '0px 0px 10px rgba(0, 0, 0, 0.2)',
      },
      fontFamily:{
        'logo': ['KoPub Batang'] 
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ['group-hover'],
      visibility: ['group-hover']
    }
  }
}

