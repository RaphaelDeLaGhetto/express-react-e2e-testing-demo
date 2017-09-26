let path = require('path');
let webpack = require('webpack');
 
module.exports = {
  entry: './react/index.js',
  output: { path: __dirname, filename: './public/scripts/bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
