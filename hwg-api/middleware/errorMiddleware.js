const { MainError } = require('../services/errorService');

module.exports = (err, req, res, next) => {
  if (err instanceof MainError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  
  console.error('Erreur serveur inattendue :', err);
  return res.status(500).json({
    message: 'The server encountered an unexpected problem that prevents it from responding to this request.',
  });
}