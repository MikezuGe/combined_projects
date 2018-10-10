const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const WebpackLivereloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { htmlTemplate, } = require('./utility');


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
      'fix': false,
      'emitWarning': true,
    },
  },
};

const babelLoader = {
  'test': /\.js$/,
  'exclude': /node_modules/,
  'use': {
    'loader': 'babel-loader',
    'options': {
      'presets': [
        [
          '@babel/preset-env',
          {
            'targets': {
              'node': true,
            },
          },
        ],
        '@babel/preset-react',
      ],
      'plugins': [
        '@babel/plugin-proposal-class-properties',
      ]
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

const webpackDefinedPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(mode),
});

const pluginHtmlWebpackPlugin = project => {
  return new HtmlWebpackPlugin({
    'filename': path.resolve(`./public/${project}/index.html`),
    'inject': false,
    'cache': true,
    'minify': isProduction,
    'templateContent': htmlTemplate({
      'title': project,
      'jsSources': [
        `/${project}/${bundleName}`,
        isProduction ? '' : 'http://localhost:35729/livereload.js',
      ],
    }),
  });
}

const webpackLivereloadPlugin = new WebpackLivereloadPlugin({});


const projects = fs.readdirSync('./public')
.filter(file =>
  fs.lstatSync(`./public/${file}`).isDirectory() &&
  fs.readdirSync(`./public/${file}`).includes('src'));


module.exports = {
  mode,
  'entry': projects.reduce((total, current) => {
    total[current] = `./public/${current}/src/app.js`;
    return total;
  }, {}),
  'output': {
    'path': __dirname + '/public',
    'filename': `[name]/${bundleName}`,
  },
  'devtool': isProduction ? 'hidden-source-map' : 'source-map',
  'module': {
    'rules': [
      eslintLoader,
      babelLoader,
      fileLoader,
    ],
  },
  plugins: [
    webpackDefinedPlugin,
    webpackLivereloadPlugin,
    ...projects.map(pluginHtmlWebpackPlugin),
  ],
};
