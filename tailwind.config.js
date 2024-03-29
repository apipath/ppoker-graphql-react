module.exports = {
  purge: ['./src/**/*.{js,ts}', './src/**/*.{jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fill-40': 'repeat(auto-fill, minmax(10rem, auto))',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
        xxl: '35rem',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
      borderColor: [
        'responsive',
        'hover',
        'focus',
        'group-hover',
        'motion-reduce',
      ],
      transform: [
        'responsive',
        'hover',
        'focus',
        'motion-safe',
        'motion-reduce',
      ],
      animation: [
        'responsive',
        'hover',
        'focus',
        'motion-safe',
        'motion-reduce',
        'group-hover',
      ],
    },
  },
};
