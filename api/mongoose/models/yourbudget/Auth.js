const mongoose = require('mongoose');
const db = require('../../connections/yourbudget');


module.exports = db.model('Auth', new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId(),
  },
  sessionTimeout: {
    type: Date,
    default: () => Date.now() + 3600000, // 1 hour
  },
  sessionStarted: {
    type: Date,
    default: Date.now,
  },
}));
