const path = require('path');


const eslintLoader = {
  'enforce': 'pre',
  'test': /\.js$/,
  'exclude': /node_modules/,
  'use': {
    'loader': 'eslint-loader',
    'options': {
      'presets': [ 'env', 'stage-2', 'react' ],
    },
  },
}


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

const cssLoader = {
  'test': /\.css$/,
  'exclude': /node_modules/,
  'use': {
    'loader': 'css-loader',
    'options': {
      'minimize': false,
      'sourceMap': false, // Style loader creates the sourcemap
      'camelCase': false,
    },
  },
};

const styleLoader = {
  'test': /\.css$/,
  'exclude': /node_modules/,
  'use': {
    'loader': 'style-loader',
    'options': {
      'singleton': true,
      'sourceMap': false, // Create sourcemap here. Cssloader might sourcemap the single css-file styleloader creates
      'convertToAbsoluteUrls': true,
    },
  },
};

const fileLoader = {
  'test': /\.svg$/,
  'exclude': /node_modules/,
  'use': {
    'loader': 'file-loader',
    'options': {},
  },
};


// Each project should have its own webpack configuration
const projects = [];
let projectName = 'test';
projects.push({
  'mode': 'development',
  'entry': `./public/${projectName}/src/app.js`,
  'output': {
    'filename': 'bundle.js',
    'path': path.resolve(__dirname, `public/${projectName}`),
  },
  'module': {
    'rules': [
      eslintLoader,
      babelLoader,
      styleLoader,
      cssLoader,
      fileLoader,
    ],
  },
});


projectName = 'yourbudget';
projects.push({
  'mode': 'development',
  'entry': `./public/${projectName}/src/app.js`,
  'output': {
    'filename': 'bundle.js',
    'path': path.resolve(__dirname, `public/${projectName}`),
  },
  'module': {
    'rules': [
      eslintLoader,
      babelLoader,
      styleLoader,
      cssLoader,
      fileLoader,
    ],
  },
});


projectName = 'images';
projects.push({
  'mode': 'development',
  'entry': `./public/${projectName}/src/app.js`,
  'output': {
    'filename': 'bundle.js',
    'path': path.resolve(__dirname, `public/${projectName}`),
  },
  'module': {
    'rules': [
      eslintLoader,
      babelLoader,
      styleLoader,
      cssLoader,
      fileLoader,
    ],
  },
});


// Add each configuration to the array
module.exports = projects;