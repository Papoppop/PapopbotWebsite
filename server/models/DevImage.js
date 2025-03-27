const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const devimages = sequelize.define('Devimage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    devid: {
        type: DataTypes.INTEGER,
        references: {
            model: 'developers',
            key: 'id'
        },
        allowNull: false
    },
    devsticker1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    devsticker2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    devsticker3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mouthopen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profileWafer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'developers_images',
    timestamps: false
  });
  
  module.exports = devimages