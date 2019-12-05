
const { director } = require('../jsontoSql');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('directors', director),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
