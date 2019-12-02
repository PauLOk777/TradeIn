const argon2 = require('argon2');

const User = require('../models/User');

async function addUser(username, email, password) {
	const hash = await argon2.hash(password);

	const user = new User({
		username,
		email,
		password: hash
	});

	await user.save();
}

async function checkUser(email, password) {
	const user = await User.findOne({ email });
	if (!user) return false;
	return argon2.verify(user.password, password);
}

async function findUser(email) {
	const user = await User.findOne({ email });
	if(!user) throw new Error('Invalid email');
	return user;
}

module.exports = {
	addUser,
	checkUser,
	findUser
};