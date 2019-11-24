const path = require('path');
// const argon2 = require('argon2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000 || process.env.PORT;

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

app.post('/sign/in', function(req, res) {
	console.dir(req.body);
});

app.post('/sign/up', function(req, res) {
	console.dir(req.body);
});

app.listen(PORT, function() {
    console.log(`>>> Server has been running at port ${PORT}.`);
});
