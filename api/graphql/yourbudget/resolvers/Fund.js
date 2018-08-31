const { Fund, } = require('../../../mongoose/models/yourbudget');


const Query = {
  fund: async args => await Fund.findById(args),
  funds: async () => await Fund.find(),
};


const Mutations = {
  createFund: async ({ input, }) => await Fund.create(input),
  updateFund: async ({ _id, input, }) => await Fund.findByIdAndUpdate({ _id, }, input, { new: true, }),
  removeFund: async args => await Fund.findByIdAndRemove(args),
};


module.exports = {
  ...Query,
  ...Mutations,
};
