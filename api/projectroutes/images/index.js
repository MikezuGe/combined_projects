const express = require('express');
const fs = require('fs');
const router = express.Router();

// Custom router imports
// ...

router

.get('/api/images', (req, res) => {
  fs.readdir('./public/images/data', (err, images) => {
    res.send(images);
  });
});


module.exports = router;