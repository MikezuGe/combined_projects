const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Custom router imports
const apiRouter = require('./api');


const createHTML = files => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Kontioweb</title>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <link rel="icon" type="image/gif" href="shared_assets/favicon/favicogifslow.gif">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
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
        ${files.map(file => `<a class='links' href='${file}'>${file}</a>`).join('')}
      </div>
    </body>
  </html>
`;


app

  .use(express.static(path.join(__dirname + '/public')))

  .get('/', (req, res) => {
    console.log('----- Requesting mainpage');
    fs.readdir('./public', (err, files) => {
      if (err) {
        console.error(err);
        res.send('Unable to read public');
      }
      res.send(createHTML(files.filter(file => fs.readdirSync(`./public/${file}`).includes('index.html'))));
    });
  })

  .use(apiRouter)

  .get('/*', (req, res) => {
    console.log('----- Requesting subpage');
    console.log(req.originalUrl);
    res.sendFile(path.resolve('./public' + req.path.slice(0, req.path.indexOf('/', 1)), 'index.html'));
  })

  .listen(80, () => {
    console.log('Listening to port 80');
  });
