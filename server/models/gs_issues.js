'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GS_Issues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GS_Issues.init({
    projectId: DataTypes.STRING,
    status: DataTypes.STRING,
    subject: DataTypes.STRING,
    addedBy: DataTypes.STRING,
    doneProcess: DataTypes.STRING,
    assignee: DataTypes.STRING,
    startDate: DataTypes.DATE,
    dueDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'GS_Issues',
  });
  return GS_Issues;
};