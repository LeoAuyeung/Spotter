/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('confirmedSessions', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    userId_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTIme: {
      type: DataTypes.TIME,
      allowNull: false
    },
    user_1_confirm: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    user_2_confirm: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'confirmedSessions'
  });
};
