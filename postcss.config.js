module.exports = {
  plugins: [
    require('postcss-import')({
      root: __dirname,
    }),
    require('postcss-mixins')({}),
    require('postcss-each')({}),
    require('postcss-cssnext')({}),
  ]
};
