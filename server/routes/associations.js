const PapopbotDev = require('./models/PapopbotDev');
const DevDetails = require('./models/DevDetails');
const DevImage = require('./models/DevImage');
const DevPosition = require('./models/DevPosition');

PapopbotDev.hasOne(DevDetails, {
    foreignKey: 'devid',
    as: 'details'
  });
  
  PapopbotDev.hasOne(DevImage, {
    foreignKey: 'devid',
    as: 'images'
  });
  
  PapopbotDev.hasMany(DevPosition, {
    foreignKey: 'devid',
    as: 'positions'
  });
  
  DevDetails.belongsTo(PapopbotDev, {
    foreignKey: 'devid'
  });
  
  DevImage.belongsTo(PapopbotDev, {
    foreignKey: 'devid'
  });
  
  DevPosition.belongsTo(PapopbotDev, {
    foreignKey: 'devid'
  });
  
  module.exports = {
    PapopbotDev,
    DevDetails,
    DevImage,
    DevPosition
  };