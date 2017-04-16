"use strict";

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StatsPlugin = require('stats-webpack-plugin');

module.exports = [{
  entry: {
    path.join(__dirname, 'app/app.jsx')
  },
  output: {
    path: path.join(__dirname, "/build/"),
    filename: "[name]-[hash].min.js",
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
         loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
       }
     ]
  },
  postcss: [
    require("autoprefixer")
  ]
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.template.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false,
          screw_ie8: true
      }
    }),
    new StatsPlugin("webpack.stats.json", {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}];
