function errorHandler(error, _req, response, _next) {
  if (error?.name === 'HttpError' && typeof error.status === 'number') {
    return response.status(error.status).json({ message: error.message });
  }

  if (error && error.name === 'ValidationError') {
    return response.status(400).json({
      message: 'Validation failed',
      errors: Object.values(error.errors).map((error) => error.message),
    });
  }

  console.error(error);
  response.status(500).json({ message: 'Internal server error' });
}

module.exports = errorHandler;
