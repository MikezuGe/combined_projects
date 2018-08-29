const mongoose = require('mongoose');
const db = require('../../connections/yourbudget');


const Schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  isIncome: {
    type: Boolean,
  },
  date: {
    type: Date,
  },
  dateAdded: {
    type: Date, default: Date.now
  },
});



const Fund = db.model('Fund', Schema);


/*
Fund.findOne().sort('-id').exec(function (err, fund) {
  console.log(err, fund, fund.id);
  //Fund.create({ id: fund.id + 1, name: 'test', amount: '5.43', isIncome: true, date: new Date(), })
  //  .then(fund => console.log(fund))
  //  .catch(err => console.log(err));
});
*/


module.exports = Fund;
