const path = require('path');

module.exports = {
  target: 'node',
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: {
      type: 'commonjs2',
    },
  },
  externals: { vscode: 'commonjs vscode' },
  externalsPresets: {
    node: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
