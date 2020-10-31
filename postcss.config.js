const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['./src/**/*.jsx'],
  },
];

module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
