// Modules
const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	cost: { type: Number, required: true },
	// Коэффициент максимального изменения курса за день
	maxChangePerDay: {
		type: Number,
		required: true
	},
	// Коэффициент минимального изменения курса за день
	minChangePerDay: {
		type: Number,
		required: true
	},
	// Шанс (от 0 до 1) что сегодня валюта вырастет
	chanceToIncrease: {
		type: Number,
		required: true
	}
});

const Currency = mongoose.model('currency', CurrencySchema);

module.exports = Currency;