'use strict';

// Dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var PORT = process.env.PORT || 8083;
var app = express();

var db = require("./models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/populate", { useNewUrlParser: true });

// mongoose
mongoose.Promise = Promise;
var dbURI = process.env.MONGODB_URI || "mongodb";

mongoose.set('useCreateIndex', true)
mongoose.connect(dbURI, { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose is CONNECTED");
    // start the server, listen on port 3000
    app.listen(PORT, function() {
        console.log("App running on port " + PORT);
    });
});


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//app.use('/static', express.static('public'));
app.use(express.static(__dirname+'/public'));
app.use(require('./controllers'));


// Routes
app.get("/", function (req, res) {
    res.render("about");
});
app.get("/about", function (req, res) {
    res.render("about");
});

app.get("/portfolio", function (req, res) {
    res.render("portfolio")
});

app.get("/contact", function (req, res) {
    res.render("contact");
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});

module.exports = app;