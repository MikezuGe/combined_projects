const { User, } = require('../../../mongoose/models/yourbudget');


const Query = {
  user: async args => await User.findById(args),
  users: async () => await User.find(),
};


const Mutations = {
  createUser: async ({ input, }) => await User.create(input),
  updateUser: async ({ _id, input, }) => await User.findByIdAndUpdate({ _id, }, input, { new: true, }),
  removeUser: async args => await User.findByIdAndRemove(args),
};


module.exports = {
  ...Query,
  ...Mutations,
};
