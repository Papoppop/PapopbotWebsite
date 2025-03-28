'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('developers_images', 'devid', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('developers_images', 'devsticker1', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('developers_images', 'devsticker2', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('developers_images', 'devsticker3', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('developers_images', 'mouthopen', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('developers_images', 'image', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('developers_images', 'profileWafer', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('developers_images', 'profile', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('developers_images', 'devid', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('developers_images', 'devsticker1', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('developers_images', 'devsticker2', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('developers_images', 'devsticker3', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('developers_images', 'mouthopen', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('developers_images', 'image', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('developers_images', 'profileWafer', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('developers_images', 'profile', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
