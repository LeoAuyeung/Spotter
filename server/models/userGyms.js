/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userGyms', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    gymId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gyms',
        key: 'id'
      }
    }
  }, {
    tableName: 'userGyms'
  });
};
