var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo/pokemonModel');
var morgan = require('morgan');

var app = express();

// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));


app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }, {limit: '100mb'}));
app.use(morgan('combined'));

//need to run this 151 times to populate our database
app.post('/', (req, res) => {
  items.saveAll(req.body, (err, data)=>{
    if (err) {
      res.sendStatus(501);
    } else {
      res.sendStatus(201);
    }
  });
});

//find a pokemon by its name from out database
app.post('/name', function (req, res) {
	console.log("THIS IS REQ.boDY: ", req.body);
  items.selectOne(req.body, function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
    	console.log("GET ROUTE BODY: ", req.body);
    	console.log("Get route RETURN DATA: ", data);
      res.status(401).send(data);
    }
  });
});



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

