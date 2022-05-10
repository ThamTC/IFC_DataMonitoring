'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GS_Statistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GS_Statistic.init({
    type: DataTypes.STRING,
    system: DataTypes.STRING,
    parameter: DataTypes.STRING,
    priority: DataTypes.STRING,
    status: DataTypes.STRING,
    total: DataTypes.STRING,
    action: DataTypes.STRING,
    userCheck: DataTypes.STRING,
    userDone: DataTypes.STRING,
    doneTime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GS_Statistic',
  });
  return GS_Statistic;
};