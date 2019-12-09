// Modules
const mongoose = require('mongoose');
const { promisify } = require('util');

// Models
const User = require('../models/User');
const Currency = require('../models/Currency');

// Constants
const URL = 'mongodb://localhost:27017/tradein';

async function init() {
	// Mongoose options
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);

	try {
		await promisify(mongoose.connect).call(mongoose, URL);
	} catch (err) {
		console.error(`Database connection error: ${err.message}`);
		process.exit(1);
	}
	console.error('>>> Database was connected');
}

async function addCurrencies() {
	const currencies = [
		{
			name: 'USD',
			cost: 1,
			maxChangePerDay: 1.5,
			minChangePerDay: 0.8,
			chanceToIncrease: 0.9
		},
		{
			name: 'FIL',
			cost: 2,
			maxChangePerDay: 1.3,
			minChangePerDay: 0.9,
			chanceToIncrease: 0.85
		},
		{
			name: 'KEMARKA',
			cost: 0.4,
			maxChangePerDay: 3,
			minChangePerDay: 0.7,
			chanceToIncrease: 0.88
		},
		{
			name: 'PAUL',
			cost: 253,
			maxChangePerDay: 12,
			minChangePerDay: 0.01,
			chanceToIncrease: 0.35
		},
		{
			name: 'YARIK',
			cost: 0.002,
			maxChangePerDay: 144,
			minChangePerDay: 0.0002,
			chanceToIncrease: 0.6
		},
	];
	
	try {
		await promisify(Currency.insertMany).call(Currency, currencies);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.error('>>> Currencies were added');
}

module.exports = {
	init,
	addCurrencies,
};