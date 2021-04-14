const express = require("express");
const bodyParser = require("body-parser");
const vendasRoute = require("./src/routes/venda.route");
const revendedorRoute = require("./src/routes/revendedor.route")
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 3000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// define a root route
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/", vendasRoute);
app.use("/", revendedorRoute);

module.exports = app;
