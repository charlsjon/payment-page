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
        obsidian: '#0B1215',
        platinum: '#E0E0E0',
        gravel: '#4C4C4C',
        mist: '#959595',
        porcelain: '#F2F2F2',
        stardust: '#9E9E9E',
        lightgrey: '#D9D9D9'
      },
      borderRadius: {
        x75: '75px'
      },
      height: {
        '100': '28rem',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

