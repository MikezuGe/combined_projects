const { User, } = require('../../../mongoose/models/yourbudget');


const Query = {
  user: async args => console.log(args),//await User.findOne(args),
  users: async () => console.log('got funds'),//await User.find(),
}


const Mutations = {
  createUser: async ({ input, }) => console.log(input),//await User.create(input),
  updateUser: async ({ _id, input, }) => console.log(_id, input),//await User.findByIdAndUpdate({ _id, }, input),
  removeUser: async args => console.log(args),//await User.findByIdAndRemove(args),
}


module.exports = {
  ...Query,
  ...Mutations,
};
