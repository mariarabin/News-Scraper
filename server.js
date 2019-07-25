'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var PORT = process.env.PORT || 8083;
var app = express();

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(require('./controllers'));

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

module.exports = app;