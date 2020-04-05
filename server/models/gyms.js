/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gyms', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    placeId: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lng: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lat: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'gyms'
  });
};
