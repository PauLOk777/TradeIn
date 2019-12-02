const path = require('path');

const { addUser, checkUser, findUser } = require('../libs/users');
const { addSession, findSession, 
	updateSignIn, updateLog } = require('../libs/sessions');
const generateKey = require('../libs/random');

async function indexPage(req, res) {
	//res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
	//status, account, mail, title, link
	console.log(req.cookies.uniq_id + ' home');
	if(!req.cookies.uniq_id) {
		res.render('main.hbs', {
			title: 'Home',
			mail: 'Click',
			account: '',
			status: 'Sign In',
			link: '/sign/in',
		});
		return;
	}

	const currentSession = await findSession(req.cookies.uniq_id);
	const currentUser = await findUser(currentSession.email);
	let statusLog;
	let linkLog;

	if (currentSession.log) {
		statusLog = 'Sign Out';
		linkLog = '/sign/out';
	} else {
		statusLog = 'Sign In';
		linkLog = '/sign/in';	
	}

	res.render('main.hbs', {
		title: 'Home',
		mail: currentUser.email,
		account: '/account',
		status: statusLog,
		link: linkLog,
	});
}

function signInPage(req, res) {
	//res.sendFile(path.join(__dirname, '..', '..', 'public', 'signIn.html'));
	if(req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}

	res.render('signIn.hbs', {
		title: 'Sign In',
		mail: 'Click',
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
	//res.sendFile(path.join(__dirname, '..', '..', 'public', 'signUp.html'));
	res.render('signUp.hbs', {
		title: 'Sign Up',
		mail: 'Click',
		account: '',
		status: 'Home',
		link: '/',
	});
}

function accountPage(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return;
	}
}

function depositPage(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return
	}
}

function tradePage(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return
	}	
}

function currencyPage(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return
	}
}

function rulesPage(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return
	}
}

function deposit(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return
	}
}

function trade(req, res) {
	if(!req.cookies.uniq_id) {
		res.redirect('/');
		return
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
			console.dir(info);
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
	signOut	
};