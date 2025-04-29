const { createServer } = require("node:http");
const url = require("url");
const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  const x = 0;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  //   console.log(req.constructor.name, res.constructor.name)

  console.log("Request Headers :>> ", req.headers);
  console.log("Request Method :>> ", req.method);
  console.log("Request URL :>> ", req.url);

  const urlData = url.parse(req.url, true);

  console.log(urlData);

  res.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
