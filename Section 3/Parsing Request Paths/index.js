/*
 * Primary file for API
 *
 */

// Dependencies
const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {

  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  console.log(parsedUrl);

  // Get the path
  const path = parsedUrl.pathname;

  // Send the response
   res.end('Hello World\n');
  // Log the request path
});

server.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT} now`);
})