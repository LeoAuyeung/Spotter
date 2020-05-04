// use dotenv if not in production
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");

const apiRouter = require("./routes/index");

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.get("/", (req, res, next) => res.send("Spotter Backend"));
app.use("/api", apiRouter);

module.exports = app;
