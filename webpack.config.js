const { join } = require('path');

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    path: join(__dirname, 'build', 'js'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
