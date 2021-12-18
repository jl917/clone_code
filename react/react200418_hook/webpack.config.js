const wpp_html = require('html-webpack-plugin');
const wpp_css = require("mini-css-extract-plugin")
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      }    
    ]
  },
  plugins: [
    new wpp_html({
      title: 'title',
      filename: 'index.html',
      template: './src/app.html',

    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    host: 'localhost',//'localhost',//host: '192.168.0.57',
    hot: true,
    port: 3000
  },
  optimization: {
    splitChunks: {
      name: 'common',
      chunks: 'all'
    }
  }
};