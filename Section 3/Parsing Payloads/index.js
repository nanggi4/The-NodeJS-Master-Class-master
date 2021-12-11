/*
 * Primary file for API
 *
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

 // Configure the server to respond to all requests with a string
var server = http.createServer(function(req,res){

  // Parse the url
  var parsedUrl = url.parse(req.url, true);

  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // Get the HTTP method
  var method = req.method.toLowerCase();

  //Get the headers as an object
  var headers = req.headers;

  // Get the payload,if any
  const decoder = new StringDecoder('uft-8');
  const buffer = '';
  req.on('data', (data) => {
    buiffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    // Send the response
    res.end('Hello World\n');

    
  });
});

// Start the server
server.listen(3000,function(){
  console.log('The server is up and running now');
});
