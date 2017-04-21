"use strict";

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  context: __dirname,
  devtool: "eval-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(__dirname, 'app/app.jsx')
  ],
  output: {
    path: path.join(__dirname, "/build/"),
    filename: "[name]-[hash].js",
    publicPath: '/'
  },
  module: {
     loaders: [{
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         query: {
           presets: ['react', 'es2015', 'stage-0', 'react-hmre'],
           plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
         }
       },
       {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
          exclude: /node_modules/
       },
       {
         test: /\.css$/,
         loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]'
       },
       {
         test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
         loader: "file-loader"
       },
			 {
         test: /\.(woff|woff2)$/,
         loader:"url-loader?prefix=font/&limit=5000"
       },
			 {
         test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
         loader: "url-loader?limit=10000&mimetype=application/octet-stream"
       },
			 {
         test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
         loader: "url-loader?limit=10000&mimetype=image/svg+xml"
       }
     ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      title: "Intelligence IDE",
      template: "app/index.template.html",
      inject: "body",
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
