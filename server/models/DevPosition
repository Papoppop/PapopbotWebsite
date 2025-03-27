const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const developers = sequelize.define('DevPosition', {
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
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, {
    tableName: 'developers_position',
    timestamps: false
  });
  
  module.exports = developers