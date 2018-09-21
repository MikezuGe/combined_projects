const { Auth, User, } = require('../../../mongoose/models/yourbudget');
const { logger, } = require('../../../../utility');


const Query = {
  auth: async args => {
    const auth = await Auth.findOne(args);
    const user = await User.findOne({ _id: auth.userId, });
    auth.user = user;
    return auth;
  },
  auths: async () => {
    const auths = await Auth.find();
    const users = await User.find({ _id: { $in: auths.map(auth => auth.userId), }, });
    return auths.map(auth => {
      auth.user = users.find(user => user._id.equals(auth.userId));
      return auth;
    });
  },
};


const Mutations = {
  createAuth: async ({ input, }, { req, res, }) => {
    const user = await User.findOne({ email: input.email, });
    if (!user) {
      res.write('Email not found');
      return;
    } else if (user.password !== input.password) {
      res.write('Invalid password');
      return;
    }
    const { sessionId, } = req.cookies;
    if (sessionId) {
      await Auth.deleteOne({ sessionId, });
    }
    const auth = await Auth.create({ userId: user._id, });
    auth.user = user;
    res.cookie('sessionId', auth.sessionId, { httpOnly: true, });
    return auth;
  },
  updateAuth: async args => await Auth.updateOne(args, { sessionTimeout: Date.now() + 3600000, }),
  deleteAuth: async args => await Auth.deleteOne(args),
};


/*
setInterval(async () => {
  const result = await Auth.deleteMany({ sessionTimeout: { $lt: Date.now(), } });
  logger.log(`Deleted ${result.n} timed out sessions.`);
}, 60000);
*/


module.exports = {
  ...Query,
  ...Mutations,
};
