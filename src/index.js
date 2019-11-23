const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'SignIn.html'));
});

app.get('/registration', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'regist.html'));
});

app.listen(PORT, function() {
    console.log(`>>> Server has been running at port ${PORT}.`);
});
