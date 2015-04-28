/// <reference path="../../typings/tsd.d.ts" />

import * as express from "express";
import * as path from "path";
import errorHandler = require("errorhandler");

// Use environment variable `$PORT` or value 3000.
let port = process.env.PORT || 3000;
let mode = process.env.NODE_ENV || "development";
// Store path to node_modules in root directory.
let nodeModulesPath = path.join(__dirname, "../../node_modules/");
// Name of modules which will be served publically.
let publicNodeModules = [
  "angular2",
  "normalize.css"
];

let app = express();
// Statically serve public folder.
app.use(express.static(path.join(__dirname, " ../public")));
// Statically serve each of specified `publicNodeModules`.
publicNodeModules.forEach((publicModule) => {
  app.use("/" + publicModule, express.static(path.join(nodeModulesPath, publicModule)));
});
if (mode === "development") {
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}
else {
  app.use(errorHandler());
}

app.listen(port, () => {
  console.log(`Static server listening on ${port} in ${mode} mode...`)
});

export var App = app;
