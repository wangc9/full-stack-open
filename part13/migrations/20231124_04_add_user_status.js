const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'enabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'enabled');
    await queryInterface.dropTable('sessions');
  },
};
