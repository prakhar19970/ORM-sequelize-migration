
const { moviesObject } = require('../jsontoSql');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('movies', moviesObject),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
