const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readlists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      blog_id: {
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
        default: 'unread',
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('readlists');
  },
};
