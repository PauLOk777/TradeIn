const path = require('path');
const hbs = require('hbs');
const expressHbs = require('express-handlebars');

function init(app) {
    app.engine(
        'hbs',
        expressHbs({
            layoutsDir: 'views/layouts',
            defaultLayout: 'layout',
            extname: 'hbs',
        })
    );

    hbs.registerPartials(path.join(__dirname, '..', 'views', 'partials'));

    app.set('view engine', 'hbs');
}

module.exports = { init };
