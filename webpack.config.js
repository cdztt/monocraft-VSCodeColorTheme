const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'webworker',
  entry: './dist/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: {
      type: 'commonjs2',
    },
  },
  externals: [nodeExternals(), { vscode: 'commonjs vscode' }],
  // externals: { vscode: 'commonjs vscode' },
  externalsPresets: {
    node: true,
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
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
