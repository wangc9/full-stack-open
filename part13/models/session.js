const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../util/db');

class Session extends Model {}
Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'session',
  }
);

module.exports = Session;
