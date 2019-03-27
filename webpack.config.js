require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const WebpackLivereloadPlugin = require('webpack-livereload-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const htmlTemplate = ({ title, jsSources, }) => `<!DOCTYPE html>

<html>
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, shrink-to-fit=no'>
    <link rel='icon' type='image/gif' href='/shared_assets/favico/favicogifslow.gif'>
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    <title>${title}</title>
  </head>
  <body>
    <div id='root'></div>
    ${jsSources.filter(source => !!source).map(source => `<script type='text/javascript' src='${source}'></script>`).join('\n    ')}
  </body>
</html>
`;
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
      'cache': false,
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
        [ '@babel/env', { 'targets': { 'node': true, }, }, ],
        [ '@babel/react', ],
      ],
      'plugins': [
        [ '@babel/proposal-class-properties', ],
      ],
    },
  },
};

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
};

const openBrowserWebpackPlugin = new OpenBrowserWebpackPlugin({
  url: 'http://localhost:3000',
  //ignoreErrors: true,
});

const webpackLivereloadPlugin = new WebpackLivereloadPlugin({});

const processEnvPlugin = new webpack.DefinePlugin({
  'process.env.JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
});

const projects = fs.readdirSync('./public')
.filter(file =>
  fs.lstatSync(`./public/${file}`).isDirectory() &&
  fs.readdirSync(`./public/${file}`).includes('src'));


module.exports = {
  mode,
  'entry': projects.reduce((total, current) =>
    ({ ...total, [current]: `./public/${current}/src/app.js`, }), {}),
  'output': {
    'path': __dirname + '/public',
    'filename': `[name]/${bundleName}`,
  },
  'resolve': {
    'alias': {
      'components': path.resolve('./public/shared_assets/components'),
    }
  },
  'devtool': isProduction ? 'hidden-source-map' : 'eval-source-map',
  'module': {
    'rules': [
      eslintLoader,
      babelLoader,
    ],
  },
  plugins: [
    processEnvPlugin,
    openBrowserWebpackPlugin,
    webpackLivereloadPlugin,
    ...projects.map(pluginHtmlWebpackPlugin),
  ],
};
