const { User, } = require('../../../mongoose/models/yourbudget');


const handleFilters = filters => {
  if (!filters) {
    return {};
  }

  if (filters.id) {
    filters._id = filters.id;
    delete filters.id;
  }

  return filters;
};


const Query = {
  getUsers: async args => {
    console.log(args);
    const user = await User.find(handleFilters(args.filters))
    console.log(user);
    return user;
  },
};


const Mutation = {
  createUser: async args => await User.create(args.input),
  updateUser: async args => await User.findOneAndUpdate(handleFilters(args.filters), args.input, { new: true, }),
  removeUser: async args => await User.findOneAndRemove(handleFilters(args.filters)),
};


module.exports = {
  ...Query,
  ...Mutation,
};
