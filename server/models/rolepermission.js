'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GS_RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GS_RolePermission.init({
    name: DataTypes.STRING,
    permission: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GS_RolePermission',
  });
  return GS_RolePermission;
};