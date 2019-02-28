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


const checkForExisting = async (key, value) => ((await User.findOne({ [key]: value, })) && key);
const checkInput = async ({ email, username, }) => (
  (email && await checkForExisting('email', email))
  || (username && await checkForExisting('username', username))
);


const Query = {
  getUsers: async args => {
    const user = await User.find(handleFilters(args.filters))
    return user;
  },
};


const Mutation = {
  createUser: async args => {
    const keyInUse = await checkInput(args.input);
    // ADD EMAIL CHECKING
    // ADD USERNAME CHECKING
    // ADD PASSWORD HASHING
    return keyInUse
      ? new Error(`${keyInUse} is already in use`)
      : await User.create(args.input);
  },
  updateUser: async args => {
    const keyInUse = await checkInput(args.input);
    // ADD EMAIL CHECKING
    // ADD USERNAME CHECKING
    // ADD PASSWORD HASHING
    return keyInUse
      ? new Error(`${keyInUse} is already in use`)
      : await User.findOneAndUpdate(handleFilters(args.filters), args.input, { new: true, });
  },
  removeUser: async args => await User.findOneAndRemove(handleFilters(args.filters)),
};


module.exports = {
  ...Query,
  ...Mutation,
};
