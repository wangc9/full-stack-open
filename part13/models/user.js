const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'user',
    defaultScope: {
      where: { enabled: true },
    },
  }
);

module.exports = User;
