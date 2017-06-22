const path = require('path')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './public/src/js/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'public/src')],
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devServer: {
    publicPath: '/dist',
    contentBase: path.resolve(__dirname, 'public')
  }
}
