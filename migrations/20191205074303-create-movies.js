'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Title: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      Runtime: {
        type: Sequelize.INTEGER
      },
      Genre: {
        type: Sequelize.STRING
      },
      Rating: {
        type: Sequelize.FLOAT
      },
      Metascore: {
        type: Sequelize.INTEGER
      },
      Votes: {
        type: Sequelize.MEDIUMINT
      },
      Gross_Earning_in_Mil: {
        type: Sequelize.FLOAT
      },
      Director: {
        type: Sequelize.STRING
      },
      Actor: {
        type: Sequelize.STRING
      },
      Year: {
        type: Sequelize.INTEGER
      }
    },{timestamps :false});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('movies');
  }
};