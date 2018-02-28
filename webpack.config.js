const webpack = require('webpack');
const path = require('path');
const lodash = require('lodash');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/main.js',
  output: {
    path: process.cwd() + '/build',
    filename: '[name].js',
    publicPath: '/build/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    publicPath: '/build/',
    contentBase: './',
    proxy: {
      "/menu": {
        target: "http://localhost:4200",
        pathRewrite: {"/menu" : ""}
      },
      "/home": {
          target: "http://localhost:4201",
          pathRewrite: {"/home" : ""}
      },
      "/app2": {
        target: "http://localhost:4203",
        pathRewrite: {"/app2" : ""}
      },
      "/app1": {
        target: "http://localhost:9001",
        pathRewrite: {"/app1" : ""}
      },
      "/app3": {
        target: "http://localhost:9002",
        pathRewrite: {"/app3" : ""}
      }
    }
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "./"),
    ],
    alias: {
      'single-spa': path.resolve(__dirname, 'node_modules/single-spa/lib/single-spa.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        exclude: /node_modules|svelte/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: getBabelConfig(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
    CopyWebpackPlugin([
      {from: path.resolve(__dirname, 'libs/system.js')},
    ]),
  ],
};

function getBabelConfig() {
  return {
    presets: [
      ['babel-preset-env', {
        targets: {
          "browsers": ["last 2 versions"],
        },
      }],
    ],
    plugins: [
      'transform-object-rest-spread',
      'transform-class-properties',
      'syntax-dynamic-import',
      'transform-function-bind',
    ],
  };
}
