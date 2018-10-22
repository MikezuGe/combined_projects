const { Fund, } = require('../../../mongoose/models/yourbudget');


const setFilters = filter => {
  console.log('---', filter);
  if (filter.startDate) {
    filter.date = { $gte: new Date(filter.startDate), };
    delete filter.startDate;
  }
  if (filter.endDate) {
    filter.date = { ...filter.date, $lte: new Date(filter.endDate), };
    delete filter.endDate;
  }
  if (filter.minAmount) {
    filter.amount = { $gte: parseFloat(filter.minAmount), };
    delete filter.minAmount;
  }
  if (filter.maxAmount) {
    filter.amount = { ...filter.amount, $lte: parseFloat(filter.maxAmount), };
    delete filter.maxAmount;
  }
  console.log('---', filter);
  return filter;
}


const Query = {
  funds: async args => { return await Fund.find(setFilters(args.filter)); },
};


const Mutations = {
  createFunds: async args => await Fund.create(args.input),
  updateFunds: async args => await Fund.updateMany({ id: args.id, }, args.input, { new: true, }),
  removeFunds: async args => await Fund.deleteMany({ id: args.id, }),
};


module.exports = {
  ...Query,
  ...Mutations,
};
