// Modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { promisify } = require('util');
const engine = require('../engine/engine');

const router = require('../router/router');

// Constants
const PORT = process.env.PORT || 3000;

const init = async function() {
    const app = express();

    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use('/', router);

    engine.init(app);

    await promisify(app.listen).call(app, PORT);

    console.log(`>>> Server has been running at port ${PORT}`);
};

module.exports = { init };
