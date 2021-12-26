/**
 * Primary file for the API
 */

// Dependencies
const http = require('http');
const https = require('https');
const { stringify } = require('querystring');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const url = require('url');
const fs = require('fs');
const _data = require('./lib/data');

// @TODO delete this
_data.read('test', 'newFile', {'foo' : 'bar'}, (err) => {
  console.log('this was the error', err);
});

const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

httpServer.listen(config.httpPort, () => {
  console.log(`The httpServer is listening on port ${config.httpPort}`);
});

const httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

httpsServer.listen(config.httpPort, () => {
  console.log(`The httpsServer is listening on port ${config.httpsPort}`);
});

const unifiedServer = (req, res) => {

  // Get the URL and parse it
  let parsedUrl = url.parse(req.url, true);

  // Get the path
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP Method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new stringify('uft-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      'payload': buffer 
    };

    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
      payload = typeof(payload) === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path 
      console.log('Request received on path: ' + trimmedPath 
      + ' with method: ' + method + ' and with these query string parameter ' 
      + queryStringObject); 
    });
  });
};

let handlers = {};

handlers.ping = (data, callback) => {
  callback(200);
};

handlers.sample = (data, callback) => {
  // Callback a http status code and a payload object
  callback(406, {'name': 'sample handler'});
};

handlers.notFound = (data, callback) => {
  callback(404);
};

// Define a request router
const router = {
  'sample': handlers.sample
};