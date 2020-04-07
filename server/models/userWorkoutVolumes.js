/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userWorkoutVolumes', {
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
    workoutId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workouts',
        key: 'id'
      }
    },
    volumeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'volumes',
        key: 'id'
      }
    },
    maxNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'userWorkoutVolumes'
  });
};
