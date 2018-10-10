module.exports = htmlTemplate = ({ title, jsSources, }) => `<!DOCTYPE html>

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
