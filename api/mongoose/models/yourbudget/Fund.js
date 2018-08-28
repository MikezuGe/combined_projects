const mongoose = require('mongoose');
const db = require('../../connections/yourbudget');


const Schema = new mongoose.Schema({
  id: Number,
  name: String,
  amount: Number,
  isIncome: Boolean,
  date: Date,
  dateAdded: { type: Date, default: Date.now },
});



const Fund = db.model('Fund', Schema);
Fund.findOne().sort('-id').exec(function (err, fund) {
  console.log(err, fund, fund.id);
  /*Fund.create({ id: fund.id + 1, name: 'test', amount: '5.43', isIncome: true, date: new Date(), })
    .then(fund => console.log(fund))
    .catch(err => console.log(err));
    */
});


module.exports = Fund;
