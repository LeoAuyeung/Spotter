/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userTraits', {
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
    traitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'traits',
        key: 'id'
      }
    }
  }, {
    tableName: 'userTraits'
  });
};
