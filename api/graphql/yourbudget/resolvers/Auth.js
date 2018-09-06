const { Auth, User, } = require('../../../mongoose/models/yourbudget');
const { logger, } = require('../../../../utility');


const Query = {
  auth: async args => {
    const auth = await Auth.findById(args);
    return { ...auth, user: await User.findById({ _id: auth.userId, }), }
  },
  auths: async () => {
    console.log('getting auths');
    const auths = await Auth.find();
    console.log('auths', auths);
    const users = await User.find({ _id: { $in: auths.map(auth => auth.userId), }, });
    console.log('users', users);
    const combined = auths.map(auth => { auth.user = users.find(user => user._id = auth.userId); });
    console.log('combined', combined);
    return combined;
  },
};


const Mutations = {
  createAuth: async ({ input, }) => {
    logger.log(`Yourbudget login: ${input.email}.`);
    const user = await User.findOne({ email: input.email, });
    if (!user) {
      logger.log(`Yourbudget login: ${input.email} failed: No such email`);
    } else if (input.password !== user.password) {
      logger.log(`Yourbudget login: ${input.email} failed: Incorrect password`);
    }
    let auth = await Auth.findOne({ userId: user._id, });
    if (!auth) {
      auth = await Auth.create({ userId: user._id, /* sessionIp: get ip of user, */ });
      logger.log(`Yourbudget login: ${input.email} success.`);
    } else {
      logger.log(`Yourbudget login: ${input.email} already logged.`);
    }
    return { sessionId: auth._id, user, };
  },
  deleteAuth: async args => await Auth.deleteOne(args),
  deleteAuths: async () => {
    console.log('getting auths');
    const auths = await Auth.deleteMany();
    console.log('auths', auths);
    const users = await User.find({ _id: { $in: auths.map(auth => auth.userId), }, });
    console.log('users', users);
    const combined = auths.map(auth => { auth.user = users.find(user => user._id = auth.userId); });
    console.log('combined', combined);
    return combined;
  },
};


module.exports = {
  ...Query,
  ...Mutations,
};
