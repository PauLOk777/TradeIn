const path = require('path');

const { addUser, checkUser } = require('../libs/users');

function indexPage(req, res) {
	res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
}

function signInPage(req, res) {
	res.sendFile(path.join(__dirname, '..', '..', 'public', 'signIn.html'));
}

function signUpPage(req, res) {
	res.sendFile(path.join(__dirname, '..', '..', 'public', 'signUp.html'));
}

async function signIn(req, res) {
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
}

async function signUp(req, res) {
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
}

module.exports = {
	indexPage,
	signInPage,
	signUpPage,
	signIn,
	signUp
};