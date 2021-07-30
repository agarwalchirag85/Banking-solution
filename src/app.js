const express = require("express");
const compression = require("compression");
const cors = require("cors");
const routes = require("./router/v1");
const helmet = require("helmet");

const app = express();

app.use(helmet());


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use(compression());


app.use(cors());
app.options("*", cors());

app.use("/v1", routes);

module.exports = app;
