const mongoose = require('mongoose');
const db = require('../../getConnection')('yourbudget');


module.exports = db.model('Fund', new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => mongoose.Types.ObjectId(),
  },
  name: { type: String,   },
  amount: { type: Number, },
  isIncome: { type: Boolean, },
  date: { type: Date, },
  dateAdded: {
    type: Date,
    default: () => Date.now(),
  },
}, {
  toJSON: { virtuals: true, },
  toObject: { virtuals: true, },
}));
