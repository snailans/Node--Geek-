const http = require("http");
const fs = require("fs");

const viewsCounter = {
  "/": 0,
  "/about": 0,
};

const updateViewsCounter = (url) => {
  if (viewsCounter.hasOwnProperty(url)) {
    viewsCounter[url]++;
  }
};

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    updateViewsCounter("/");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body>");
    res.write("<h1>Welcome to the Home Page</h1>");
    res.write("<p>Number of views: " + viewsCounter["/"] + "</p>");
    res.write('<a href="/about">About Page</a>');
    res.write("</body></html>");
    res.end();
  } 
  else if (url === "/about") {
    updateViewsCounter("/about");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body>");
    res.write("<h1>About Page</h1>");
    res.write("<p>Number of views: " + viewsCounter["/about"] + "</p>");
    res.write('<a href="/">Home Page</a>');
    res.write("</body></html>");
    res.end();
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<html><body>");
    res.write("<h1>404 Not Found</h1>");
    res.write("<p>The requested URL was not found on this server.</p>");
    res.write("</body></html>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});