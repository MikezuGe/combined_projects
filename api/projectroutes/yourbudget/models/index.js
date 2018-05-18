const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://mngryb:dbmng3ryb!@kontioweb.fi/yourbudget');


db.model('Budget', mongoose.Schema({
  dateAdded: { type: Date, default: Date.now, },
  isIncome: Boolean,
  name: String,
  amount: Number,
  date: String,
}));


/* FOR INSERTING TEST DATA */
db.models.Budget.find({}, (err, budget) => {
  if (err) {
    console.error('Error occurred while trying to find budget data');
    return;
  }
  if (budget.length > 0) {
    return;
  }
  console.log('Adding test data');
  const formatDateToString = date => `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
  const timeNow = Date.now();
  const testData = [
    new db.models.Budget({
      name: 'K-Market',
      amount: 4.99,
      date: formatDateToString(new Date(timeNow - 172800000)),
      dateAdded: timeNow,
      isIncome: false,
    }),
    new db.models.Budget({
      name: 'Prisma',
      amount: 14.99,
      date: formatDateToString(new Date(timeNow - 142800000)),
      dateAdded: timeNow,
      isIncome: false,
    }),
    new db.models.Budget({
      name: 'Livion',
      amount: 250.00,
      date: formatDateToString(new Date(timeNow - 102800000)),
      dateAdded: timeNow,
      isIncome: true,
    }),
    new db.models.Budget({
      name: 'ABC',
      amount: 60.00,
      date: formatDateToString(new Date(timeNow - 2800000)),
      dateAdded: timeNow,
      isIncome: false,
    }),
  ];
  db.models.Budget.collection.insert(testData, err => {
    if (err) {
      console.error(`Error in inserting testdata to yourbudget ${err}`);
      return;
    }
    console.log('Succesfully inserted testdata to yourbudget');
  });
});
/* FOR INSERTING TEST DATA END */

module.exports = db.models;
