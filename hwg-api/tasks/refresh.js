const cron = require('node-cron');
const { Op } = require('sequelize');
const Refresh = require('../models/refresh');

// Planifier la tâche cron pour exécuter la purge tous les jours à minuit (00:00)
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Starting token cleanup...');
    // Supprimer les tokens expirés
    const result = await Refresh.destroy({
      where: {
        expiresAt: { [Op.lt]: new Date() }, // Trouver les tokens expirés
      },
    });
    console.log(`Deleted ${result} expired refresh tokens.`);
  } catch (error) {
    console.error('Error during token cleanup:', error);
  }
});
