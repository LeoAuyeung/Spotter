/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('traits', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'traits'
  });
};
