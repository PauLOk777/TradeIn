// Modules
const mongoose = require('mongoose');

// Models
const Currency = require('../models/Currency');

// Constants
const INTERVAL = 10e3; // 10 seconds
const DAY = 24 * 60 * 60e3; // 1 day
const FACTOR = INTERVAL / DAY;

async function updateCurrencies() {
	const currencies = await Currency.find();
	for (const currency of currencies) {
		const { 
			cost,
			maxChangePerDay,
			minChangePerDay,
			chanceToIncrease
		} = currency;
		const isIncrease = Math.random() <= chanceToIncrease;
		const change = isIncrease ? 1 + (maxChangePerDay - 1) * FACTOR :
									1 - (1 - minChangePerDay) * FACTOR;
		currency.cost *= change;
		await currency.save();
	}
}

function init() {
	setInterval(updateCurrencies, INTERVAL);
	console.log('>>> Daemon was started');
}

module.exports = { init };