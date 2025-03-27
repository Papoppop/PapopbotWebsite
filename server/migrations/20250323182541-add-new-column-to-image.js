'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('developers_images', 'profile', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('developers_images', 'profileWafer', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('developers_images', 'profile');
    await queryInterface.removeColumn('developers_images', 'profileWafer');
  }
};
