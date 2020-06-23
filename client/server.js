const express = require("express");
// const serveStatic = require("serve-static");
const path = require("path");
const history = require('connect-history-api-fallback');
const app = express();
// app.use(serveStatic(path.join(__dirname, "dist")));
// app.use(history());
// app.use(serveStatic(path.join(__dirname, "dist")));

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true,
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));
app.use(staticFileMiddleware);

const port = process.env.PORT || 80;
app.listen(port);