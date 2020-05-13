/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schedules', {
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
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    dayId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'days',
        key: 'id'
      }
    }
  }, {
    tableName: 'schedules'
  });
};
