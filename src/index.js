const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { addUser, checkUser } = require('./libs/database');

const app = express();
const PORT = 3000 || process.env.PORT;

mongoose.connect('mongodb://localhost:27017/tradein', (err) => {
	if (err) {
		console.error('Database connection error!');
		process.exit(1);
	}
	console.error('>>> Database was connected');
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'SignIn.html'));
});

app.get('/registration', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'regist.html'));
});

app.post('/sign/in', async function(req, res) {
    const { email, password } = req.body;
    try {
    	const match = await checkUser(email, password);
    	if (match) {
    		res.status(200);
    		res.end('User was signed up!');
    		//....
    	} else {
    		res.status(401);
    		res.end('Invalid sign up data!');
    	}
    } catch (err) {
    	console.error(err);
    	res.status(400);
    	res.end('Error: wrong post data was sent!');
    }
});

app.post('/sign/up', async function(req, res) {
    const { username, email, password } = req.body;
    try {
    	await addUser(username, email, password);
    	res.status(200);
    	res.end('User was added!');
    	//....
    } catch (err) {
    	console.error(err);
    	res.status(401);
    	res.end('Error: wrong post data was sent!');
    }
});

app.listen(PORT, function() {
    console.log(`>>> Server has been running at port ${PORT}.`);
});
