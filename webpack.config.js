const path = require('path');

module.exports = {
  entry: './public/src/index.js',
  output: {
    filename: './public/dist/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'public/src')],
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  }
};
