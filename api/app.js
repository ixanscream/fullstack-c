const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
Result =require('./models/result');

// mongo connection
mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect('mongodb://mongo:27017/fullstack-exercise', { useNewUrlParser: true, useUnifiedTopology: true  });
//mongoose.connect('mongodb://localhost:27017/fullstack-exercise', { useNewUrlParser: true, useUnifiedTopology: true  });

// checks connection
const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// default route
app.get('/', (req, res) => {
	res.send('Rest API');
});

// retrieve lists of Security Scan Result
app.get('/api/results', (req, res) => {
	Result.getResults((err, results) => {
		if(err){
			res.json(err);
		}
		res.json(results);
	});
});

//get a Security Scan Redult by Id
app.get('/api/result/:_id', (req, res) => {
	Result.getResultById(req.params._id, (err, result) => {
		if(err){
			res.json(err);
		}
		res.json(result);
	});
});

//create a Security Scan Result
app.post('/api/result', (req, res) => {
	var result = req.body;
	Result.addResult(result, (err, result) => {
		if(err){
			res.json(err);
		}
		res.json(result);
	});
});


app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});