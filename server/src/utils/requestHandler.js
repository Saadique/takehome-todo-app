
function handleRequest(fn) {
  return function handler(request, response, next) {
    Promise.resolve(fn(request, response, next)).catch(next);
  };
}

module.exports = handleRequest;
