/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        '10%': '5vw',
      },
      colors: {
        'main-purple': 'hsl(306,60%,36%)',
        'main-purple-light': 'hsl(306, 60%, 42%)',
        'second-blue': 'hsl(206, 100%, 41%)',
      },
      animation: {
        'spin-slower': 'spin 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
