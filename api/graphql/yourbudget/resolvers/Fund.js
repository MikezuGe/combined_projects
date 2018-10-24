const { Fund, } = require('../../../mongoose/models/yourbudget');


const handleFilters = filter => {
  if (!filter) {
    return {};
  }

  if (filter.id) {
    filter._id = filter.id;
    delete filter.id;
  }

  if (filter.name) {
    filter.name = { $regex: filter.name, $options: 'i', };
  } else if (filter.name === "") {
    delete filter.name;
  }

  if (filter.startDate) {
    filter.date = { $gte: filter.startDate, };
    delete filter.startDate;
  }
  if (filter.endDate) {
    filter.date = { $lte: filter.endDate, ...filter.date, };
    delete filter.endDate;
  }

  if (filter.minAmount) {
    filter.amount = { $gte: parseFloat(filter.minAmount), };
    delete filter.minAmount;
  }
  if (filter.maxAmount) {
    filter.amount = { $lte: parseFloat(filter.maxAmount), ...filter.amount, };
    delete filter.maxAmount;
  }

  return filter;
}


const Query = {
  getFunds: async args => await Fund.find(handleFilters(args.filter)),
};


const Mutations = {
  createFunds: async args => await Fund.create(args.input),
  updateFunds: async args => await Fund.findOneAndUpdate({ _id: args.id, }, args.input, { new: true, }),
  removeFunds: async args => await Fund.findOneAndDelete({ _id: args.id, }),
};


module.exports = {
  ...Query,
  ...Mutations,
};
