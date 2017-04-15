var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', require('./routes/soalrSystems'));


app.listen(9000);
console.log("Listening on port 9000");

module.exports = app;
