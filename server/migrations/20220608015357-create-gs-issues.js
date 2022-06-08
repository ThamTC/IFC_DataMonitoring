'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GS_Issues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      priority: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addedBy: {
        type: Sequelize.STRING,
        allowNull: false
      },
      doneProcess: {
        type: Sequelize.STRING,
        allowNull: false
      },
      assignee: {
        type: Sequelize.STRING,
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GS_Issues');
  }
};