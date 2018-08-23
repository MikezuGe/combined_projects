const mongoose = require('mongoose');

const { sndConnectionString, } = require('../../../../config');
const { logger, } = require('../../../../utility');


const db = mongoose.createConnection(sndConnectionString);


db.catch(err => {
  console.error(`Unable to connect to yourbudget database: ${err}`)
});

db.model('User', mongoose.Schema({
  email: String,
  username: String,
  password: String,
  dateAdded: { type: Date, default: Date.now },
}));


db.models.User.find({}, (err, users) => {
  if (err) {
    logger.err('Error occurred while trying to find budget data');
    return;
  }
  if (users.length > 0) {
    return;
  }
  const testData = [
    new db.models.User({
      email: 'yolo@asd.com',
      username: 'MikezuGe',
      password: 'asd',
    }),
    new db.models.User({
      email: 'molo@asd.com',
      username: 'Jukka',
      password: 'asd',
    }),
    new db.models.User({
      email: 'pomo@asd.com',
      username: 'Pasi',
      password: 'asd',
    }),
  ];
  db.models.User.collection.insert(testData, err => {
    if (err) {
      logger.err(`Error in inserting testdata to snd ${err}`);
      return;
    }
    logger.log('Succesfully inserted users testdata to snd');
  });
});


module.exports = db.models;
