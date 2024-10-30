const { Sequelize } = require('sequelize');

let sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
    },
    retry: {
      max: 5,
      match: [
        /EAI_AGAIN/, // Erreur de résolution DNS
        /ETIMEDOUT/, // Erreur de délai d'attente
        /ECONNREFUSED/ // Erreur de connexion refusée
      ],
    },
    logging: false
  }
)

sequelize.authenticate()
  .then(() => console.log('Database syncronized'))
  .catch(err => console.error('Database sync error:', err));

module.exports = sequelize