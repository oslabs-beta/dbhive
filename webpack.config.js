const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // dictates development or production environment
  mode: process.env.NODE_ENV,
  // where Webpack starts constructing bundle.js
  entry: './client/index.js',
  // where bundle.js will be placed after compiling
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build',
  },
  // used to make a copy of index.html file for serving in dev mode
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  // details for bundle transpiling
  module: {
    rules: [
      {
        // transpile js or jsx files
        test: /\.jsx?$/,
        // node_modules already transpiled
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // env is ES6 to ES5, react is jsx to js (order matters)
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        // transpile scss or sass
        test: /\.s[ac]ss$/i,
        // creates style nodes from JS strings, translates CSS into Common JS, Compiles SASS to CSS (order matters)
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        // transpile css
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // transpile png
        test: /\.png$/i,
        use: ['url-loader'],
      },
    ],
  },
  // server allows for hot module reloading (HMR) in dev mode
  devServer: {
    static: {
      // tells webpack dev server where to serve static content
      directory: path.resolve(__dirname, 'build'),
      // path must have wildcard so that all routes are served
      publicPath: '/*',
    },
    // allows backend requests to 8080 to be routed to 3000 automatically
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};