/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  purge: [
    "./index.html",
    "./src/**/*.vue",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2025', // 主色（文字等）
        gray: '#878A96', // 文字颜色
        'btn-gray': '#F1F3F9', // 背景灰
        'bd-gray': '#C3C4CD', // 下单border
        up: '#2EBD85',  // 升
        down: '#E35461' // 降
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
