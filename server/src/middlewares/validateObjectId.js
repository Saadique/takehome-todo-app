const mongoose = require('mongoose');
const HttpError = require('../errors/HttpError');

/**
 * @param {string} paramName
 */
function validateObjectId(paramName) {
  return function objectIdMiddleware(request, _res, next) {
    const value = request.params?.[paramName];
    if (!mongoose.isValidObjectId(value)) {
      return next(new HttpError(400, 'Invalid ID'));
    }
    next();
  };
}

module.exports = validateObjectId;
