// Modules
const express = require('express');
const bodyParser = require('body-parser');
const { promisify } = require('util');

const router = require('../router/router');

// Constants
const PORT = 3000 || process.env.PORT;

const init = async function() {
	const app = express();

	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use('/', router);

	await promisify(app.listen).call(app, PORT);

	console.log(`>>> Server has been running at port ${PORT}`);
}

module.exports = { init };