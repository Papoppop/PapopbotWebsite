'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('developers_details');
    if (!tableDescription.generation) {
      await queryInterface.addColumn('developers_details', 'generation', {
      type: Sequelize.STRING,
      allowNull: false
      });
    }

    await queryInterface.changeColumn('developers_details', 'devid', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    await queryInterface.changeColumn('developers_position', 'devid', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    await queryInterface.changeColumn('developers_images', 'devid', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('developers_details', 'generation');

    await queryInterface.changeColumn('developers_details', 'devid', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.changeColumn('developers_position', 'devid', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.changeColumn('developers_images', 'devid', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
