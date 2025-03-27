const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const developers = sequelize.define('Developers', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'developers',
    timestamps: false
  });
  
  module.exports = developers