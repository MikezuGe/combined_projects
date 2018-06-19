const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
const bundleName = isProduction ? 'bundle.js' : 'devBundle.js';


const eslintLoader = {
  'enforce': 'pre',
  'test': /\.js$/,
  'exclude': /node_modules/,
  'use': {
    'loader': 'eslint-loader',
    'options': {
      'presets': [ 'env', 'stage-2', 'react' ],
      'fix': false,
      'emitWarning': true,
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


const pluginEnvSetter = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(mode),
});

const pluginHtmlWebpackPlugin = project => new HtmlWebpackPlugin({
  'filename': path.resolve(`./public/${project}/index.html`),
  'title': project,
  'template': 'utility/template.html',
  'jsSource': `/${project}/${bundleName}`,
  'inject': false,
});


module.exports = fs.readdirSync('./public')
  .filter(file => fs.lstatSync(`./public/${file}`).isDirectory() && fs.readdirSync(`./public/${file}`).includes('index.html'))
  .map(project => ({
    mode,
    'entry': path.resolve(`./public/${project}/src/app.js`),
    'output': {
      'filename': bundleName,
      'path': path.resolve(`./public/${project}`),
    },
    'devtool': isProduction ? 'hidden-source-map' : 'source-map',
    'resolve': {
      'modules': [
        path.resolve(`./public/${project}/src`),
        path.resolve(`./node_modules`),
      ],
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
    plugins: [
      pluginEnvSetter,
      pluginHtmlWebpackPlugin(project),
    ],
  }));
