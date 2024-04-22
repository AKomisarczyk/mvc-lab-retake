const http = require('http');
const url = require('url');
const routes = require('./routes');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`Server is running on ${PORT}.`);

  const { pathname, method } = url.parse(req.url, true);
  
  switch (pathname) {
    case '/':
      routes.handleHome(res);
      break;
    case '/add-car':
      if (method === 'GET') {
        routes.handleAddCar(method, req, res);
      } else if (method === 'POST') {
        routes.handleAddCar(method, req, res);
      }
      break;
    case '/car':
      if (method === 'GET') {
        routes.handleCar(res);
      }
      break;
    default:
      routes.handlePageNotFound(res);
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});