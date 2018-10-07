const mongoose = require('mongoose');
const db = require('../../connections/yourbudget');


module.exports = db.model('User', new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => mongoose.Types.ObjectId(),
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  lastLogin: {
    type: Date,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true, },
  toObject: { virtuals: true, },
}));
