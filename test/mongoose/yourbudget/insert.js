const { logger, } = require('../../../utility');
const { Fund, User, } = require('../../../api/mongoose/models/yourbudget');


(async () => {
  await Fund.deleteMany();
  if (!(await Fund.find()).length) {
    logger.info('Inserting mock data into development database');
    const testData = [
      {
        name: 'Livion',
        amount: 360.50,
        isIncome: true,
        date: new Date('2018-10-20').toISOString(),
      }, {
        name: 'Prisma',
        amount: 15.10,
        isIncome: false,
        date: new Date('2018-10-22').toISOString(),
      }, {
        name: 'K-market',
        amount: 5.04,
        isIncome: false,
        date: new Date('2018-10-24').toISOString(),
      },
    ];
    await Fund.insertMany(testData);
  }
})();


(async () => {
  await User.deleteMany();
  if (!(await User.find()).length) {
    logger.info('Inserting mock data into development database');
    const testData = [
      {
        email: 'a@a.a',
        username: 'a',
        password: 'aaa',
      }, {
        email: 'b@b.b',
        username: 'b',
        password: 'bbb',
      }, {
        email: 'c@c.c',
        username: 'c',
        password: 'ccc',
      },
    ];
    await User.insertMany(testData);
  }
})();