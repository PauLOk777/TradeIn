const server = require('./init/server');
const db = require('./init/db');

async function main() {
    // Инициализация частей приложения
    await server.init();
    await db.init();

    // !!! Запускать один раз !!!
    // Добавляет валюты в БД
    // await db.addCurrencies();

	// НЕ ЗАПУСКАТЬ! МОЯ ФУНКЦИЯ
	// ДЛЯ ТЕСТИРОВАНИЯ
    // await db.addUsers();
}

main();
