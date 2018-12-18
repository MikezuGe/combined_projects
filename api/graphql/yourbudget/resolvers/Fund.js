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


const Mutations = {
  createFunds: async args => await Fund.create(args.input),
  updateFunds: async args => await Fund.findOneAndUpdate({ _id: args.id, }, args.input, { new: true, }),
  removeFunds: async args => {
    const funds = await Fund.find({ _id: { $in: args.ids, }, });
    return await Promise.all(funds.map(fund => fund.remove()));
  },
  //removeFunds: async args => await Fund.findOneAndDelete({ _id: args.id, }),
};


module.exports = {
  ...Query,
  ...Mutations,
};
