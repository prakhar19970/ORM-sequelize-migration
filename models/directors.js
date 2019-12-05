module.exports = (sequelize, DataTypes) => {
  const directors = sequelize.define('directors', {
    Director: DataTypes.STRING,
  }, { timestamps: false });
  directors.associate = function (models) {
    // associations can be defined here
  };
  return directors;
};
