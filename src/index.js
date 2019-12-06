const server = require('./init/server');
const db = require('./init/db');
const daemon = require('./init/daemon');

async function main() {
    // Инициализация компонентов приложения
    await server.init();
    await db.init();
    daemon.init();

    // !!! Запускать один раз !!!
    // Добавляет валюты в БД
    // await db.addCurrencies();

    // НЕ ЗАПУСКАТЬ! МОЯ ФУНКЦИЯ
    // ДЛЯ ТЕСТИРОВАНИЯ
    // await db.addUsers();
}

main();
