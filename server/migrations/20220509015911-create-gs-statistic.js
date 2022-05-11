'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GS_Statistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      system: {
        type: Sequelize.STRING
      },
      parameter: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.STRING
      },
      action: {
        type: Sequelize.STRING
      },
      userCheck: {
        type: Sequelize.STRING
      },
      userDone: {
        type: Sequelize.STRING
      },
      doneTime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GS_Statistics');
  }
};