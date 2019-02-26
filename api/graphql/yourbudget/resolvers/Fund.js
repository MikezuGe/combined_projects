const { Fund, } = require('../../../mongoose/models/yourbudget');


const handleFilters = filters => {
  if (!filters) {
    return {};
  }

  if (filters.id) {
    filters._id = filters.id;
    delete filters.id;
  }

  if (filters.name) {
    filters.name = { $regex: filters.name, $options: 'i', };
  } else if (filters.name === "") {
    delete filters.name;
  }

  if (filters.startDate) {
    filters.date = { $gte: filters.startDate, };
    delete filters.startDate;
  }
  if (filters.endDate) {
    filters.date = { $lte: filters.endDate, ...filters.date, };
    delete filters.endDate;
  }

  if (filters.minAmount) {
    filters.amount = { $gte: filters.minAmount, };
    delete filters.minAmount;
  }
  if (filters.maxAmount) {
    filters.amount = { $lte: filters.maxAmount, ...filters.amount, };
    delete filters.maxAmount;
  }

  return filters;
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
