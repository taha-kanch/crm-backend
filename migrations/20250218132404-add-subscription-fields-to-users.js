'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'subscriptionStartDate', {
      type: DataTypes.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'subscriptionEndDate', {
      type: DataTypes.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'subscriptionID', {
      type: DataTypes.INTEGER,
      allowNull: true
    });

    await queryInterface.addConstraint('Users', {
      fields: ['subscriptionID'],
      type: 'foreign key',
      name: 'fk_subscription_user',
      references: {
        table: 'Subscriptions',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', 'fk_subscription_user');
    await queryInterface.removeColumn('Users', 'subscriptionStartDate');
    await queryInterface.removeColumn('Users', 'subscriptionEndDate');
    await queryInterface.removeColumn('Users', 'subscriptionID');
  }
};
