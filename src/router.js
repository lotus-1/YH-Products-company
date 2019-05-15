const {
  homeHandler,
  clientDataHandler,
  postDataHandler,
  publicHandler,
  errorHandler
} = require('./handler');

const router = (request, response) => {
  const { url } = request;

  if (url === '/') {
    homeHandler(response);
  } else if (url === '/clients') {
    clientNameHandler(response);
  } else if (url === 'create-client') {
    postProductHandler(request, response);
  } else if (url.includes('public')) {
    publicHandler(url, response);
  } else {
    errorHandler(response);
  }
};

module.exports = router;
