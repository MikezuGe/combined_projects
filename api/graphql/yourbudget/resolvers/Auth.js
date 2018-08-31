const { Auth, } = require('../../../mongoose/models/yourbudget');


const Query = {
  auth: async args => await Auth.findById(args),
  auths: async () => await Auth.find(),
};


const Mutations = {
  createAuth: async ({ input, }) => await Auth.create(input),
  updateAuth: async ({ _id, input, }) => await Auth.findByIdAndUpdate({ _id, }, input, { new: true, }),
  removeAuth: async args => await Auth.findByIdAndRemove(args),
};


module.exports = {
  ...Query,
  ...Mutations,
};
