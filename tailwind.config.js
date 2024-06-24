/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./assets/js/**/*.js",
    "./index.html",
    "./node_modules/flowbite/**/*.js"
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
        lightgrey: '#D9D9D9',
        mediumgrey: '#7D7E84',
        zircon: '#F6F8FF',
        aquamarine: '#5EFFE2',
        bluehosta: '#6FC5B6'
      },
      rotate: {
        '10': '10deg'
      },
      borderRadius: {
        x75: '75px'
      },
      height: {
        '100': '28rem',
        '300': '35rem',
        '400': '48rem',
        'halfscreen': '50dvh',
        'unset': 'unset'
      },
      width: {
        '1000': '128rem',
      },
      dropShadow: {
        'custom-nero': '2px 4px 6px #212121',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

