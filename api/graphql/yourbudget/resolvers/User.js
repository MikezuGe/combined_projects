const { User, } = require('../../../mongoose/models/yourbudget');


const Query = {
  user: async args => await User.findById(args.id),
  users: async () => await User.find(),
};


const Mutations = {
  createUser: async args => await User.create(args.input),
  updateUser: async args => await User.findByIdAndUpdate({ _id: args.id, }, args.input, { new: true, }),
  removeUser: async args => await User.findByIdAndRemove({ _id: args.id, }),
};


module.exports = {
  ...Query,
  ...Mutations,
};
