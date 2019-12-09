const argon2 = require('argon2');

const User = require('../models/User');
const Currency = require('../models/Currency');

async function addUser(username, email, password) {
    const hash = await argon2.hash(password);

    const user = new User({
        username,
        email,
        password: hash,
    });

    const currencies = await Currency.find();

    for (const currency of currencies) {
        user.money.push({
            currency: currency._id,
            amount: 0,
        });
    }

    await user.save();
}

async function checkUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) return false;
    return argon2.verify(user.password, password);
}

async function findUser(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email');
    return user;
}

module.exports = {
    addUser,
    checkUser,
    findUser,
};
