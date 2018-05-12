const webpack = require('webpack');
const path = require('path');
const fs = require('fs');


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


const mode = 'development';
//const mode = 'production';


const pluginEnvSetter = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(mode),
});


module.exports = fs.readdirSync('./public')
  .filter(file => fs.readdirSync(`./public/${file}`).includes('index.html'))
  .map(project => ({
    mode,
    'entry': `./public/${project}/src/app.js`,
    'output': {
      'filename': 'bundle.js',
      'path': path.resolve(__dirname, `public/${project}`),
    },
    'devtool': 'source-map',
    'module': {
      'rules': [
        eslintLoader,
        babelLoader,
        styleLoader,
        cssLoader,
        fileLoader,
      ],
    },
    plugins: [
      pluginEnvSetter,
    ]
  }));
