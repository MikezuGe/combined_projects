require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, } = require('../../../mongoose/models/yourbudget');


const { JWT_SECRET, } = process.env;


const Query = {
  login: async ({ input: { username, password, }, }) => {
    let user = await User.findOne({ username, });
    if (!user) {
      return new Error('Username not found!');
    }
    // ADD PASSWORD HASHING
    user = await User.findOne({ username, password });
    if (!user) {
      return new Error('Wrong password!');
    }
    user = await User.findOneAndUpdate({ username, }, { lastLogin: Date.now(), }, { new: true, });
    return {
      token: await jwt.sign({
        email: user.email,
        username: user.username,
        lastLogin: user.lastLogin,
      }, JWT_SECRET, {
        audience: 'yourbudget',
        expiresIn: '1h',
      }),
    };
  }
};


module.exports = {
  ...Query,
};
