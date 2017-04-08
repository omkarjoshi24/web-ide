var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/app.jsx",
  output: {
    path: __dirname + "/bin",
    filename: "app.min.[hash].js"
  },
  module: {
     loaders: [{
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         query: {
           presets: ['react', 'env', 'stage-0'],
           plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
         }
       },
       {
          test: /\.html?$/,
          loader: 'html-loader',
          exclude: /node_modules/
       }]
  },
  plugins: debug ? [
    new HtmlWebpackPlugin({
      title: 'React App',
      template: './src/index.html'
    })
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      },
      output: {
        comments: false
      },
      mangle: false,
      sourcemap: false
    }),
    new HtmlWebpackPlugin({
      title: 'React App',
      template: './src/index.html'
    })
  ]
};
