var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var db = require("./models");

var PORT = process.env.PORT || 3002;

//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoOne";
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://maria:mongo123@ds355357.mlab.com:55357/heroku_8xq7rpf0";

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {NewUrlParser: true
  
});


require("./routes/index.js")(app)


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});