// Modules
const path = require('path');

// Models
const User = require('../models/User');
const Currency = require('../models/Currency');

// Libs
const { addUser,
		checkUser,
		findUser } = require('../libs/users');
const { addSession,
		findSession, 
		updateSignIn,
		updateLog } = require('../libs/sessions');
const generateKey = require('../libs/random');
const renderAuthorized = require('../libs/renderAuthorized');

async function indexPage(req, res) {
	//status, account, mail, title, link
	if(!req.cookies.uniq_id) {
		res.render('main.hbs', {
			title: 'Home',
			mail: 'Main info menu',
			account: '',
			status: 'Sign In',
			link: '/sign/in',
		});
		return;
	}

	await renderAuthorized(req, res, 'main.hbs','Home');
}

function signInPage(req, res) {
	if(req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}

	res.render('signIn.hbs', {
		title: 'Sign In',
		mail: 'Main info menu',
		account: '',
		status: 'Sign Up',
		link: '/sign/up',
	});
}

function signUpPage(req, res) {
	if(req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}

	res.render('signUp.hbs', {
		title: 'Sign Up',
		mail: 'Main info menu',
		account: '',
		status: 'Home',
		link: '/',
	});
}

async function accountPage(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}

	const currentSession = await findSession(req.cookies.uniq_id);
	const currentUser = await findUser(currentSession.email);
	// username, user_email, money

	res.render('account.hbs', {
		title: 'Account',
		mail: currentUser.email,
		account: 'Account',
		status: 'Sign Out',
		link: '/sign/out',
		username: currentUser.username,
		user_email: currentUser.email,
		money: currentUser.money + '$'
	});
}

async function depositPage(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}

	await renderAuthorized(req, res, 'deposit.hbs','Deposit');
}

async function tradePage(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}

	await renderAuthorized(req, res, 'trade.hbs','Trade');
}

async function currencyPage(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}

}

async function rulesPage(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}

}

async function deposit(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}

	const { money } = req.body;
	const currentSession = await findSession(req.cookies.uniq_id);
	const currentUser = await findUser(currentSession.email);
	currentUser.money += money;
	await currentUser.save();

	res.redirect('/');
}

function trade(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}
}

async function signIn(req, res) {
	if(!req.cookies.uniq_id) {
		const key = generateKey(50);
		const { email, password } = req.body;
		res.cookie('uniq_id', key);
		console.log(key + ' key');

		try {
			const info = await updateSignIn(email, key);
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
}

async function signUp(req, res) {
	if (!req.cookies.uniq_id) {
		const key = generateKey(50);
		res.cookie('uniq_id', key);
		const { username, email, password } = req.body;
		

		try {
			await addSession(key, email);
			await addUser(username, email, password);
			res.status(200);
			res.redirect('/');
			//....
		} catch (err) {
			console.error(err);
			res.status(401);
			res.end('Error: wrong post data was sent!');
		}
	} else {
		res.redirect('/');
		return;
	}
}

async function signOut(req, res) {
	const info = await updateLog(req.cookies.uniq_id);
	res.clearCookie('uniq_id').redirect('/');
}

async function getCurrencies(req, res) {
	const currencies = await Currency.find();
	const response = {};
	response.currencies = currencies.map(
		(currency) => ({
			name: currency.name,
			cost: currency.cost
		})
	);
	res.header('Content-Type', 'application/json');
	res.end(JSON.stringify(response));
}

async function getUser(req, res) {
	const { username } = req.query;
	const user = await User.findOne({ username });
	
	res.header('Content-Type', 'application/json');
	
	if (!username || !user) {
		// No username or user - send an empty json object
		res.end(JSON.stringify({}));
	} else {
		const response = {
			username: user.username,
			email: user.email,
			money: user.money
		}
		res.end(JSON.stringify(response));	
	}
}

module.exports = {
	indexPage,
	signInPage,
	signUpPage,
	accountPage,
	depositPage,
	tradePage,
	currencyPage,
	rulesPage,
	deposit,
	trade,
	signIn,
	signUp,
	signOut,
	getCurrencies,
	getUser
};