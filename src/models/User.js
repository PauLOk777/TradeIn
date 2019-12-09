// Modules
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    /*
     * Тип для денег - массив с объектом, где currency
     * это ссылка на определенную валюту (через связи
     * в MongoDB), а amount - количество. Значение по
     * умолчанию - доллар (id == 0), 0 шт.
     */
    money: {
        type: [
            {
                currency: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'currency',
                    required: true,
                    unique: true,
                },
                amount: {
                    type: Number,
                    required: true,
                },
            },
        ],
        required: true,
    },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
