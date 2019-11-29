const path = require('path');

const { addUser, checkUser } = require('../libs/users');

function indexPage(req, res) {
	//res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
	//status, account, mail, title, link
	res.render('main.hbs', {
		title: 'Home',
		mail: 'Click',
		account: '',
		status: 'Sign In',
		link: '/sign/in',
	});
}

function signInPage(req, res) {
	//res.sendFile(path.join(__dirname, '..', '..', 'public', 'signIn.html'));
	res.render('signIn.hbs', {
		title: 'Sign In',
		mail: 'Click',
		account: '',
		status: 'Sign Up',
		link: '/sign/up',
	});
}

function signUpPage(req, res) {
	//res.sendFile(path.join(__dirname, '..', '..', 'public', 'signUp.html'));
	res.render('signUp.hbs', {
		title: 'Sign Up',
		mail: 'Click',
		account: '',
		status: 'Home',
		link: '/',
	});
}

async function signIn(req, res) {
	const { email, password } = req.body;
	try {
		const match = await checkUser(email, password);
		if (match) {
			res.status(200);
			res.redirect('/');
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
		res.redirect('/');
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