module.exports = function errorHandler(err, req, res, next) {
  console.error('Error inesperado:', err);

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
};
