const http = require('http');
const htmlGenerator = require('./htmlGenerator');
const carsFunctions = require('./cars');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`Server is running on ${PORT}.`);

  res.writeHead(200, {'Content-Type': 'text/html'});

  res.write(htmlGenerator.getHTMLDocumentStart());
  res.write('<body>');


  const carId = 1;
  res.write(`<p>${carsFunctions.getCarInformation(carId)}</p>`);
  res.write(`<p>${carsFunctions.getCarAge(carId)}</p>`);

  res.write('</body>');
  res.write(htmlGenerator.getHTMLDocumentEnd());

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});