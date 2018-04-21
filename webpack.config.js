const path = require('path');





const babelLoader = {
  'test': /\.js$/,
  'exclude': /node_modules/,
  'use': {
    'loader': 'babel-loader',
    'options': {
      'presets': [ 'env', 'stage-2', 'react' ],
    },
  },
}


// Each project should have its own webpack configuration
const webpack = {
  'mode': 'development',
  'entry': './test/src/app.js',
  'output': {
    'filename': 'bundle.js',
    'path': path.resolve(__dirname, 'test'),
  },
  'module': {
    'rules': [
      babelLoader,
    ],
  },
}


// Add each configuration to the array
module.exports = [
  webpack,
];