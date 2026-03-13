// database/setup.js
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || './database/music_library.db',
  logging: false
});

// Define Track model
const Track = sequelize.define('Track', {
  trackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  songTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artistName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  albumName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER
  },
  releaseYear: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'tracks',
  timestamps: false
});

async function initDb() {
  try {
    await sequelize.authenticate();      // test connection[web:1]
    await sequelize.sync();              // create tables if they don't exist[web:1]
    console.log('Database synced.');
  } catch (err) {
    console.error('Error initializing DB:', err);
  } finally {
    await sequelize.close();             // close after setup[web:1]
  }
}

if (require.main === module) {
  initDb();
}

module.exports = { sequelize, Track };
