const { Fund, } = require('../../../mongoose/models/yourbudget');


const Query = {
  fund: async args => await Fund.findById(args.id),
  funds: async () => await Fund.find(),
};


const Mutations = {
  createFund: async args => await Fund.create(args.input),
  updateFund: async args => await Fund.findByIdAndUpdate({ _id: args.id, }, args.input, { new: true, }),
  removeFund: async args => await Fund.findByIdAndRemove({ _id: args.id, }),
};


module.exports = {
  ...Query,
  ...Mutations,
};
