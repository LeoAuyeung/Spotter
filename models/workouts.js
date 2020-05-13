/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workouts', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageLink: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'workouts'
  });
};
