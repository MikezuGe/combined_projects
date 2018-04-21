const express = require('express');
const path = require('path');
const app = express();

app

.get('/*', (req, res, next) => {
  console.log('connection');
  console.log(req.path);
  next();
})
.use(express.static(path.join(__dirname + '/public')))

.listen(80, () => {
  console.log('Listening to port 80');
});
