// webpack v4
const path = require('path');
const webpack = require('webpack');
const _extract_text = require('extract-text-webpack-plugin');
const _mini_css = require('mini-css-extract-plugin');
const _html_webpack = require('html-webpack-plugin');
const _clean_webpack = require('clean-webpack-plugin');
const _bundle_analyze = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const _build_path = path.resolve(__dirname, 'wwwroot');

let _pathsToClean = [
  'wwwroot'
]

let _cleanOptions = {
  root:     __dirname,
  exclude:  [
    'favicon.ico',
    'images',
    'lib'
  ],
  verbose: true,
  dry: false,
  allowExternal: false
}

module.exports = {
  //entry: { main: './src/js/app-0.1.js' },
  entry: [
    './src/js/app-0.1.js',
    './src/scss/app-0.1.scss',
    './src/vendors/mdb/scss/mdb.scss'
  ],
  output: {
    path: _build_path,
    filename: 'js/bundle-0.1.js'
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
          { loader: 'style-loader' },
          { 
            loader: _mini_css.loader,
            options: { 
              publicPath: '../'
            }
          },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
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
        loader: 'file-loader?name=fonts/roboto/[name].[ext]'        
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
    new _mini_css({
      filename: 'css/bundle-0.1.css'
    }),
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
    //new _clean_webpack(['wwwroot'])
    new _clean_webpack(_pathsToClean, _cleanOptions),
    new _bundle_analyze()
  ]
};