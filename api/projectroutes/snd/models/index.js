const mongoose = require('mongoose');


const db = mongoose.createConnection('mongodb://mngrsnd:dbmng3rsnd!@kontioweb.fi/searchanddestroy');


db.model('User', mongoose.Schema({
  username: String,
  password: String,
  dateAdded: { type: Date, default: Date.now },
}));


db.models.User.find({}, (err, users) => {
  if (err) {
    console.error('Error occurred while trying to find budget data');
    return;
  }
  if (users.length > 0) {
    return;
  }
  const testData = [
    new db.models.User({
      username: 'MikezuGe',
      password: 'asd',
    }),
    new db.models.User({
      username: 'Jukka',
      password: 'asd',
    }),
    new db.models.User({
      username: 'Pasi',
      password: 'asd',
    }),
  ];
  db.models.User.collection.insert(testData, err => {
    if (err) {
      console.error(`Error in inserting testdata to searchanddestroy ${err}`);
      return;
    }
    console.log('Succesfully inserted testdata to snd');
  });
});


module.exports = db.models;
