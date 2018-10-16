const Fund = require('../../../api/mongoose/models/yourbudget').Fund;


(async () => {
  await Fund.deleteMany();
  if (!(await Fund.find()).length) {
    const testData = [
      {
        name: 'Livion',
        amount: 360.50,
        isIncome: true,
        date: new Date().toISOString(),
      }, {
        name: 'Prisma',
        amount: 15.10,
        isIncome: false,
        date: new Date().toISOString(),
      }, {
        name: 'K-market',
        amount: 5.04,
        isIncome: false,
        date: new Date().toISOString(),
      },
    ];
    await Fund.insertMany(testData);
  }
})();
