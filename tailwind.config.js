module.exports = {
  content: [
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      colors: {
        white: 'hsl(0, 100%, 100%)',
        black: 'hsl(0, 0%, 0%)',
        grey: {
          50: 'hsl(220, 38%, 97%)',
          500: 'hsl(219, 13%, 44%)',
        },
        blue: {
          50: 'hsl(225, 100%, 96%)',
          100: 'hsl(220, 50%, 95%)',
          300: 'hsl(216, 47%, 78%)',
          500: 'hsl(223, 100%, 59%)',
          850: 'hsl(215, 27%, 32%)',
          900: 'hsl(216, 25%, 25%)',
          950: 'hsl(214, 24%, 23%)',
        },
        green: {
          100: 'hsl(151, 88%, 94%)',
          500: 'hsl(151, 68%, 52%)',
        },
        purple: {
          100: 'hsl(278, 100%, 95%)',
          600: 'hsl(277, 91%, 56%)',
        },
        orange: {
          50: 'hsl(27, 100%, 96%)',
          400: 'hsl(22, 100%, 60%)',
        },
        red: {
          500: 'hsl(0, 82%, 63%)',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}