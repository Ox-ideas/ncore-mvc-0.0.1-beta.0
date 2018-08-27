// webpack v4
const path = require('path');
const webpack = require('webpack');
const _extract_text = require('extract-text-webpack-plugin');
const _mini_css = require('mini-css-extract-plugin');
const _html_webpack = require('html-webpack-plugin');
const _clean_webpack = require('clean-webpack-plugin');

module.exports = {
  //entry: { main: './src/js/app-0.1.js' },
  entry: [
    './src/js/app-0.1.js',
    './src/scss/app-0.1.scss',
    './src/vendors/mdb/scss/mdb.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-0.1.js'
  },
  module: {
    rules: [
      {
        //test: /\.js$/,
        test: /\.js?$/,
        exclude: [/node_modules/, /vendors/],
        use: [{
          loader: "babel-loader"
        }]
      },
      {
        test: /\.css$/,
        use: _extract_text.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        //test: /\.scss$/,
        test: /\.scss?$/,
        /*use: _extract_text.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })*/
        use: [
          'style-loader', _mini_css.loader, 
          'css-loader', 'postcss-loader', 'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      // Font-awesome 4.7.X
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [/vendors/, /img/],
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      // MDB
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [/node_modules/, /img/],
        loader: 'file-loader?name=font/roboto/[name].[ext]',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          useRelativePath: true,
        },
      },
    ]
  },
  plugins: [
    new _extract_text({ filename: 'bundle-0.1.css'}),
    new _mini_css({ filename: 'bundle-0.1.css'}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Waves: 'node-waves',
    }),
    new _html_webpack({
      template: 'src/index.html',
    }),
    new _clean_webpack(['dist'])
  ]
};