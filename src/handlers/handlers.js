// Modules
const path = require('path');

// Models
const User = require('../models/User');
const Currency = require('../models/Currency');

// Libs
const { addUser, checkUser, findUser } = require('../libs/users');
const {
    addSession,
    findSession,
    updateSignIn,
    updateLog,
} = require('../libs/sessions');
const generateKey = require('../libs/random');
const renderAuthorized = require('../libs/renderAuthorized');

async function indexPage(req, res) {
    //status, account, mail, title, link
    if (!req.cookies.uniq_id) {
        res.render('main.hbs', {
            title: 'Home',
            mail: 'Main info menu',
            account: '',
            status: 'Sign In',
            link: '/sign/in',
        });
        return;
    }

    await renderAuthorized(req, res, 'main.hbs', 'Home');
}

function signInPage(req, res) {
    if (req.cookies.uniq_id) {
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
    if (req.cookies.uniq_id) {
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
    if (!req.cookies.uniq_id) {
        res.redirect('/');
        return;
    }

    const currentSession = await findSession(req.cookies.uniq_id);
    const currentUser = await findUser(currentSession.email);
    const currencies = [];

    for (let i = 0; i < 5; i++) {
        let temp = await Currency.findById(currentUser.money[i].currency);
        currencies.push(temp);
    }

    let strMoney = '';
    for (let i = 1; i < 5; i++) {
        let amountStr = '';
        let temp = '';
        temp += currentUser.money[i].amount;
        if (temp.length > 9) {
            for (let i = 0; i < 9; i++) {
                amountStr += temp[i];
            }
        } else {
            amountStr = currentUser.money[i].amount;
        }

        strMoney +=
            currencies[i].name + ': ' + amountStr + '; ';
    }

    // username, user_email, money

    res.render('account.hbs', {
        title: 'Account',
        mail: currentUser.email,
        account: 'Account',
        status: 'Sign Out',
        link: '/sign/out',
        username: currentUser.username,
        user_email: currentUser.email,
        money: currentUser.money[0].amount + '$',
        currency: strMoney,
    });
}

async function depositPage(req, res) {
    if (!req.cookies.uniq_id) {
        res.redirect('/');
        return;
    }

    await renderAuthorized(req, res, 'deposit.hbs', 'Deposit');
}

async function tradePage(req, res) {
    if (!req.cookies.uniq_id) {
        res.redirect('/');
        return;
    }
    const currentSession = await findSession(req.cookies.uniq_id);
    const currentUser = await findUser(currentSession.email);

    let currencies = [];

    for (let i = 0; i < 5; i++) {
        let temp = await Currency.findById(currentUser.money[i].currency);
        currencies.push(temp);
    }

    currencies = JSON.stringify(currencies);

    res.render('trade.hbs', {
        title: 'Trade',
        mail: currentUser.email,
        account: 'Account',
        status: 'Sign Out',
        link: '/sign/out',
        cost: currencies,
    });
}

async function rulesPage(req, res) {
    if (!req.cookies.uniq_id) {
        res.redirect('/');
        return;
    }

    await renderAuthorized(req, res, 'rules.hbs', 'Rules');
}

async function deposit(req, res) {
    if (!req.cookies.uniq_id) {
        res.redirect('/');
        return;
    }

    const { money } = req.body;
    const currentSession = await findSession(req.cookies.uniq_id);
    const currentUser = await findUser(currentSession.email);
    currentUser.money[0].amount += money;
    await currentUser.save();

    res.redirect('/');
}

async function trade(req, res) {
    if (!req.cookies.uniq_id) {
        res.redirect('/');
        return;
    }

    const { toName, fromName, fromAmount } = req.body;
    const currentSession = await findSession(req.cookies.uniq_id);
    const currentUser = await findUser(currentSession.email);
    
    let fromCurr, fromIndex;
    let toCurr, toIndex;

    for (let i = 0; i < 5; i++) {
    	let tempCurr = await Currency.findById(currentUser.money[i].currency);
    	
    	if(tempCurr.name == toName) {
    		toCurr = tempCurr;
    		toIndex = i;
    	}
    	
    	if (tempCurr.name == fromName) {
    		if (fromAmount > currentUser.money[i].amount) {
    			res.redirect('/trade');
                return;  
            }
    		fromCurr = tempCurr;
    		fromIndex = i;
    	}
    }

    currentUser.money[fromIndex].amount -= fromAmount;
    let amountOfSecondCurr = (fromCurr.cost / toCurr.cost) * fromAmount;
    currentUser.money[toIndex].amount += amountOfSecondCurr;
    await currentUser.save();
    
    res.redirect('/');
}

async function signIn(req, res) {
    if (!req.cookies.uniq_id) {
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

async function currencyPage(req, res) {
    let numOfCurr = req.params.id;
    const currentSession = await findSession(req.cookies.uniq_id);
    const currentUser = await findUser(currentSession.email);
    const tempCurr = await Currency.findById(currentUser.money[numOfCurr].currency);

    let strMoney = '';
    let amountStr = '';
    let costStr = '';
    let tempCost = '';
    tempCost += tempCurr.cost;
    let temp = '';
    temp += currentUser.money[numOfCurr].amount;
    if (temp.length > 9) {
        for (let i = 0; i < 9; i++) {
            amountStr += temp[i];
        }
    } else {
        amountStr = currentUser.money[numOfCurr].amount;
    }

    if(tempCost.length > 9) {
        for (let i = 0; i < 9; i++) {
            costStr += tempCost[i];
        }
    } else {
        costStr = tempCurr.cost;
    }
    
    res.render('currency.hbs', {
        title: tempCurr.name,
        mail: currentUser.email,
        account: 'Account',
        status: 'Sign Out',
        link: '/sign/out',
        nameCurr: tempCurr.name,
        userCurr: amountStr,
        cost: costStr
    });
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
    currencyPage
};
