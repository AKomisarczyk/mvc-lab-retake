const fs = require('fs');
const querystring = require('querystring');
const { renderPage: renderHomePage } = require('../views/home');
const { renderPage: renderCarPage } = require('../views/car');
const { renderPage: renderAddCarPage } = require('../views/add-car');

function handleHome(response) {
    response.setHeader('Content-Type', 'text/html');
    response.write(renderHomePage());
    response.end();
}
function handleAddCar(method, request, response) {
    if (method === 'GET') {
        response.setHeader('Content-Type', 'text/html');
        response.write(renderAddCarPage());
        response.end();
    } else if (method === 'POST') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            const formData = querystring.parse(body);
            fs.appendFile('formData.json', JSON.stringify(formData), err => {
                if (err) {
                    console.error(err);
                    response.statusCode = 500;
                    response.end();
                } else {
                    response.statusCode = 302;
                    response.setHeader('Location', '/car');
                    response.end();
                }
            });
        });
    }
}
function handleCar(response) {
    fs.readFile('formData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            response.statusCode = 500;
            response.end();
        } else {
            response.setHeader('Content-Type', 'text/html');
            response.write(renderCarPage(data));
            response.end();
        }
    });
}
function handlePageNotFound(response) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.write('404 Page Not Found');
    response.end();
}
module.exports = { handleHome, handleAddCar, handleCar, handlePageNotFound };