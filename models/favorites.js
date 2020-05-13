/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorites', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userId_1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId_2: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'favorites'
  });
};
