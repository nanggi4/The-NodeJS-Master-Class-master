/**
 * Primary file for the API
 */

// Dependencies
const http = require('http');
const { stringify } = require('querystring');
const StringDecoder = require('string_decoder').StringDecoder;
const url = require('url');
const PORT = 3000;

const server = http.createServer((req, res) => {

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

    // Send the reponse
    res.end('Hello World\n');

    // Log the request path 
    console.log('Request received on path: ' + trimmedPath 
    + ' with method: ' + method + ' and with these query string parameter ' 
    + queryStringObject); 
  });
});

server.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT} now`);
});