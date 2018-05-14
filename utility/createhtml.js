
module.exports = createHTML = files => `
<!DOCTYPE html>
<html>
  <head>
    <title>Kontioweb</title>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <link rel='icon' type='image/gif' href='/favico/favicogifslow.gif'>
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
