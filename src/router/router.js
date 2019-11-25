// Modules
const express = require('express');

const router = express.Router();

const handlers = require('../handlers/handlers');

router.get('/', handlers.indexPage);
router.get('/sign/in', handlers.signInPage);
router.get('/sign/up', handlers.signUpPage);
router.post('/sign/in', handlers.signIn);
router.post('/sign/up', handlers.signUp);

module.exports = router;