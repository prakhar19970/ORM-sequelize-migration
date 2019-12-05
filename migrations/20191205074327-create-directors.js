'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('directors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Director: {
        type: Sequelize.STRING
      }
    },{timestamps :false});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('directors');
  }
};