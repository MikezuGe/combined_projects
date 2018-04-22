const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();


const createHTML = folders => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Kontioweb</title>
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
        ${folders.map(name => `<a class='links' href='${name}'>${name}</a>`).join('')}
      </div>
    </body>
  </html>
`;


app

.use(express.static(path.join(__dirname + '/public')))

.get('/', (req, res) => {
  // Read public folder, get all folders, create links and create a html file with links and serve it to user
  fs.readdir('./public', (err, folders) => {
    if (err) {
      res.send('There was an error');
      console.error(err);
    }
    const html = createHTML(folders);
    res.send(html);
  });
})

.get('/*', (req, res) => {
  console.log(req.path);
  res.sendFile(path.resolve('./public' + req.path.slice(0, req.path.indexOf('/', 1)), 'index.html'));
})

.listen(80, () => {
  console.log('Listening to port 80');
});
