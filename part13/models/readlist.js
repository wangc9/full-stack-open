const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Readlist extends Model {}
Readlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isIn: [['read', 'unread']],
      },
      defaultValue: 'unread',
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'readlist',
  }
);

module.exports = Readlist;
