const fs = require('fs');
const path = require('path');
const indexRoute = require('express').Router();


const indexFilePath = path.resolve('./public', 'index.html');


const createIndexHTML = files => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, shrink-to-fit=no'>
    <link rel='icon' type='image/gif' href='/shared_assets/favico/favicogifslow.gif'>
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    <title>Kontioweb</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Ubuntu', sans-serif;
      }

      body {
        height: 100vh;
        width: 100vw;
      }

      #root {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
      }

      .links {
        flex: 1 0 150px;
        background-color: lightgray;
        height: 200px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <div id='root'>
      ${files.map(file => `<a class='links' href='${file}'>${file}</a>`).join('\n      ')}
    </div>
  </body>
</html>
`;


const files = fs.readdirSync('./public').filter(file => (
  fs.lstatSync(`./public/${file}`).isDirectory() &&
  fs.readdirSync(`./public/${file}`).includes('index.html')
));
fs.writeFileSync(indexFilePath, createIndexHTML(files));


indexRoute.get('/', (req, res) => {
  res.send(indexFilePath);
  return;
});


module.exports = indexRoute;
