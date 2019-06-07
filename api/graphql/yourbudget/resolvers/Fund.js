const { Fund, } = require('../../../mongoose/models/yourbudget');


const handleFilters = filters => {
  if (!filters) {
    return {};
  }

  const resultFilters = {};
  filters.id && (resultFilters._id = filters.id);
  filters.name && (resultFilters.name = { $regex: filters.name, $options: 'i', });
  filters.startDate && (resultFilters.date = { $gte: filters.startDate, });
  filters.endDate && (resultFilters.date = { $lte: filters.endDate, ...resultFilters.date, });
  filters.minAmount && (resultFilters.amount = { $gte: filters.minAmount, });
  filters.maxAmount && (resultFilters.amount = { $lte: filters.maxAmount, ...resultFilters.amount, });

  return resultFilters;
};


const Query = {
  getFunds: async args => await Fund.find(handleFilters(args.filters)),
};


const Mutation = {
  createFund: async args => await Fund.create(args.input),
  updateFund: async args => await Fund.findOneAndUpdate(handleFilters(args.filters), args.input, { new: true, }),
  removeFund: async args => await Fund.findOneAndRemove(handleFilters(args.filters)),
};


module.exports = {
  ...Query,
  ...Mutation,
};
