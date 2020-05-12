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
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());

app.get("/", (req, res, next) => res.send("Spotter Backend"));
app.use("/api", apiRouter);

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
  });

// Heroku post-build script
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
	  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
  }

module.exports = app;
