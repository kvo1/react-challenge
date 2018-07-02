const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    __MOCK_API__: process.env.MOCK_API === 'true',
    __TEST_UTILS__: process.env.NODE_ENV !== 'production' || process.env.QA_ENV === 'true',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.APP_VERSION': JSON.stringify(process.env.APP_VERSION),
  }),
  new ExtractTextPlugin({
    filename: '[name].[hash].bundle.css',
    allChunks: true
  })
];

const devPlugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ProgressBarPlugin(),
  new HtmlWebpackPlugin({
    title: process.env.APP_TITLE,
    template: './setup/template/index.html',
    inject: true,
  }),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'react.challenge',
    filename: 'react.challenge.[hash].js'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    children: true,
    async: true,
    minChunks: Infinity,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      DATA_API_URL: JSON.stringify(process.env.DATA_API_URL),
    },
  }),
  new OfflinePlugin({
    publicPath: '/',
    relativePaths: false,
    exclude: '.htaccess',
    ServiceWorker: {
      navigateFallbackURL: '/',
      events: true,
    },
    safeToUseOptionalCaches: true,
    AppCache: false,
    caches: {
      additional: ['*.js']
    },
    autoUpdate: 60 * 1000 * 5,
  }),
];

const prodPlugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compressor: {
      warnings: false,
    },
    sourceMap: true,
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new HtmlWebpackPlugin({
    template: './setup/template/index.html'
  }),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'react.challenge',
    filename: 'react.challenge.[hash].js'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new OfflinePlugin({
    publicPath: '/',
    relativePaths: false,
    exclude: '.htaccess',
    ServiceWorker: {
      navigateFallbackURL: '/',
      events: true,
    },
    safeToUseOptionalCaches: true,
    AppCache: false,
    caches: {
      additional: ['*.js']
    },
    autoUpdate: 60 * 1000 * 5,
  }),
];

const plugins = basePlugins.concat(process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins);

console.log(chalk.green('\n==============================================='));
console.log(chalk.green(`-=-=-=-=-=-=-=-=-=- ${(process.env.APP_NAME).toUpperCase()} -=-=-=-=-=-=-=-=-`));
console.log(chalk.green('==============================================='));

module.exports = {
  devtool: process.env.NODE_ENV !== 'production' ? 'cheap-module-source-map' : '',
  entry: [
    'eventsource-polyfill',
    'babel-polyfill',
    'webpack-hot-middleware/client',
    path.join(process.cwd(), 'client/index.js'),
  ],
  watch: false,
  output: {
    path: path.resolve(process.cwd(), 'public'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules', 'client'],
    alias: {
      actions: 'client/common/actions',
      components: 'client/common/components',
      constants: 'client/common/constants',
      reducers: 'client/common/reducers',
      selectors: 'client/common/selectors',
      assets: 'client/assets',
      routes: 'client/routes',
    },
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    mainFields: [
      'browser',
      'main',
      'jsnext:main',
    ],
  },
  plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.(s?)css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      })
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader?name=./images/[name].[ext]',
        {
          loader: 'image-webpack-loader',
          options: {
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        },
      ],
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader?limit=10000',
    }],
    noParse: [/dtrace-provider$/, /safe-json-stringify$/, /mv/],
  },
  node: { fs: 'empty' },
  target: 'web',
};
