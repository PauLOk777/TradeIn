const Session = require('../models/Session');


async function addSession(uniq_id, email) {
	const session = new Session({
		uniq_id,
		email
	});

	await session.save();
}

async function findSession(uniq_id) {
	const session = await Session.findOne({ uniq_id });
	if(!session) throw new Error('Invalid uniq_id');
	return session;
}

async function updateLog(uniq_id) {
	const info = await Session.updateOne({uniq_id}, {log: false});
	if(!info) throw new Error('Some error with sign out!');
	return info;
}

async function updateSignIn(email, key) {
	const info = await Session.updateOne({email}, {uniq_id: key, log: true});
	if(!info) throw new Error('Some error with sign in!');
	return info;
}

module.exports = {
	addSession,
	findSession,
	updateSignIn,
	updateLog
};