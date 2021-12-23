/**
 * Primary file for the API
 */

// Dependencies
const http = require('http');
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
  
  // Send the reponse
  res.end('Hello World\n');

  // Log the request path 
  console.log('Request received on path: ' + trimmedPath 
  + ' with method: ' + method + ' and with these query string parameter ' 
  + queryStringObject);
});

server.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT} now`);
})