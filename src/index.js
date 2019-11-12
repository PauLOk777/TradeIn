const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', function(req, res){
	res.send("TradeIn");
	res.end();
});

app.listen(PORT, function(){
	console.log(`>>> Server has been running at port ${PORT}.`);
});