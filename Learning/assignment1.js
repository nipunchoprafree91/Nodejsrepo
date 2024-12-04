/*
Spin up a Node.js-driven Server (on port 3000).

Handle two Routes:

Return some greeting text on /
Return a list of dummy users (e.g., <ul><li>User 1</li></ul>) on /users.
Add a form with a "username" <input> to the / page and submit a POST request to /create-user upon a button click.

Add the /create-user route and parse the incoming data (i.e., the username) and simply log it to the console.
*/
const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment 1</title></head>');
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
    const users = ['User 1', 'User 2'];

    res.write('<body><ul>');
    users.forEach(user => {
        res.write(`<li>${user}</li>`);
    });
    res.write('</ul></body>');
    res.write('</html>');
    return res.end();
  }
  // Send a HTML response with some "Page not found text
  if (url === '/create-user') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]); // username=whatever-the-user-entered
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }
});

server.listen(3000);