const server = require('./init/server');
const db = require('./init/db');

async function main() {
    await server.init();
    await db.init();
}

main();
