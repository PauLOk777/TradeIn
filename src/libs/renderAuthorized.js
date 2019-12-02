const { findUser } = require('./users.js');
const { findSession } = require('./sessions.js');

async function  renderAuthorized(req, res, fileName, titleName) { 
	const currentSession = await findSession(req.cookies.uniq_id);
	const currentUser = await findUser(currentSession.email);

	res.render(fileName, {
		title: titleName,
		mail: currentUser.email,
		account: 'Account',
		status: 'Sign Out',
		link: '/sign/out',
	});
}

module.exports = renderAuthorized;
