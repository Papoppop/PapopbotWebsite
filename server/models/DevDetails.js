const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const developersdetail = sequelize.define('DevelopersDetail', {
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
    likes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dislikes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personality: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'developers_details',
    timestamps: false
});

module.exports = developersdetail