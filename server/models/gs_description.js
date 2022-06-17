'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GS_Description extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GS_Description.init({
    issueId: DataTypes.INTEGER,
    content: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'GS_Description',
  });
  return GS_Description;
};