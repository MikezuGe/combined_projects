const mongoose = require('mongoose');
mongoose.connect('mongodb://budgetmanager:manag3r@kontioweb.fi/yourbudget');


mongoose.model('BudgetModel', mongoose.Schema({
  dateAdded: { type: Date, default: Date.now, },
  isIncome: Boolean,
  name: String,
  amount: Number,
  date: String,
}));


/* FOR INSERTING TEST DATA */
mongoose.models.BudgetModel.find({}, (err, budget) => {
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
    new mongoose.models.BudgetModel({
      name: 'K-Market',
      amount: 4.99,
      date: formatDateToString(new Date(timeNow - 172800000)),
      dateAdded: timeNow,
      isIncome: false,
    }),
    new mongoose.models.BudgetModel({
      name: 'Prisma',
      amount: 14.99,
      date: formatDateToString(new Date(timeNow - 142800000)),
      dateAdded: timeNow,
      isIncome: false,
    }),
    new mongoose.models.BudgetModel({
      name: 'Livion',
      amount: 250.00,
      date: formatDateToString(new Date(timeNow - 102800000)),
      dateAdded: timeNow,
      isIncome: true,
    }),
    new mongoose.models.BudgetModel({
      name: 'ABC',
      amount: 60.00,
      date: formatDateToString(new Date(timeNow - 2800000)),
      dateAdded: timeNow,
      isIncome: false,
    }),
  ];
  mongoose.models.BudgetModel.collection.insert(testData, err => {
    if (err) {
      console.log('error in inserting testdata to mongodb');
      console.log(err);
    }
    console.log('Succesfully inserted testdata');
  });
});
/* FOR INSERTING TEST DATA END */
