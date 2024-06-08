/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./assets/js/**/*js",
    "./index.html",
    "./node_modules/flowbite/**/*js"
  ],
  theme: {
    extend: {
      colors: {
        seashell: '#F0F0F0',
        nero: '#212121',
        tealgreen: '#146758',
        offwhite: '#FAF9F6',
        obsidian: '#0B1215'
      },
      borderRadius: {
        x75: '75px'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

