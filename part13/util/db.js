const Sequelize = require('sequelize');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
  } catch (error) {
    console.log('Error when connecting to database');
    return process.exit(1);
  }

  return null;
};

module.exports = { connection, sequelize };
