const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : false,
  entry: {
    loader: "./loader.js"
  },
  output: {
    path: __dirname + "/lib",
    filename: "loader.min.js",
    libraryTarget: 'amd'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
};