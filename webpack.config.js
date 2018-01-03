'use strict';

// --- dependencies
const path = require('path');
const webpack = require('webpack');

// --- plugins
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// --- Environment
const isProduction = (process.env.NODE_ENV === 'production');

// --- dev folder
const devFolder = path.resolve(__dirname, './frontend');

// --- globals
const aliasScss = 'globalScss';
const aliasStyl = 'globalStyl';

const globalStyl = `${devFolder}/assets/styl/_global.styl`;
const globalScss = `${devFolder}/assets/scss/_global.scss`;

const scss = `sass-loader?data=@import '~${aliasScss}';`;
const styl = `stylus-loader?include css&import=~${aliasStyl}`;
const css = 'css-loader?{discardComments:{removeAll:true}}';
// --- module rules
const rules = [
  {
    test: /\.css$/,
    use: [
      'vue-style-loader',
      css
    ]
  },
  {
    test: /\.(scss|sass)$/,
    use: [
      'vue-style-loader',
      css,
      scss
    ]
  },
  {
    test: /\.(styl|stylus)$/,
    use: [
      'vue-style-loader',
      css,
      styl
    ]
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      extractCSS: true,
      cssModules: {
        minimize: true,
        localIdentName: '[hash:base64:13]'
      },
      postcss: {
        useConfigFile: false,
        plugins: [
          require('postcss-import')(),
          require('postcss-cssnext')({
            features: { rem: false }
          })
        ]
      },
      autoprefixer: false,
      loaders: {
        css: ExtractTextPlugin.extract({
          use: `${css}`,
          fallback: 'vue-style-loader'
        }),
        stylus: ExtractTextPlugin.extract({
          use: `${css}!${styl}`,
          fallback: 'vue-style-loader'
        }),
        sass: ExtractTextPlugin.extract({
          use: `${css}!${scss}`,
          fallback: 'vue-style-loader'
        }),
        scss: ExtractTextPlugin.extract({
          use: `${css}!${scss}`,
          fallback: 'vue-style-loader'
        }),
        postcss: ExtractTextPlugin.extract({
          use: `postcss-loader`,
          fallback: 'vue-style-loader'
        })
      }
    }
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  }
];

// --- Base Webpack configuration
module.exports = {
  name: 'vuejs components',

  entry: path.resolve(__dirname, `${devFolder}/main.js`),

  output: {
    path: path.resolve(__dirname, (isProduction) ? './build' : './dist'),
    publicPath: (isProduction) ? './build/' : './dist/',
    filename: 'bp-vuejs.bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  module: {
    rules: rules
  },

  resolve: {
    extensions: [
      '*',
      '.css',
      '.scss',
      '.sass',
      '.styl',
      '.js',
      '.vue',
      '.json'
    ],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      globalStyl,
      globalScss
    }
  },

  performance: {
    hints: false
  },

  devtool: (isProduction) ? '' : 'source-map',

  plugins: ((!isProduction) ? [] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: isProduction,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      },
      output: {
        space_colon: false,
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]).concat([
    new ExtractTextPlugin('style.bundle.css')
  ])
};
