/*
 * Primary file for API
 *
 */

const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const queryStringObject = parsedUrl.query;

  const method = req.method.toLowerCase();

  res.end('Hello World!\n');

  console.log('Request received on path: '+trimmedPath+' with method: '+method+' and this query string: ',queryStringObject);
});

server.listen(3000,() => {
  console.log('The server is up and running now');
});
