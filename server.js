require("./routes/index.js")(app)

var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");

var db = require("./models");

var PORT = process.env.PORT || 3001;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo1";

var app = express();
var exphbs = require("express-handlebars");
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useMongoClient: true});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});