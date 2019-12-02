// Modules
const express = require('express');

const router = express.Router();

const handlers = require('../handlers/handlers');

router.get('/', handlers.indexPage);
router.get('/sign/in', handlers.signInPage);
router.get('/sign/up', handlers.signUpPage);
router.get('/account', handlers.accountPage);
router.get('/deposit', handlers.depositPage);
router.get('/trade', handlers.tradePage);
router.get('/currency', handlers.currencyPage);
router.get('/rules', handlers.rulesPage);
router.get('/clear', (req, res) => res.clearCookie('uniq_id').redirect('/'));
router.post('/deposit', handlers.deposit);
router.post('/trade', handlers.trade);
router.post('/sign/in', handlers.signIn);
router.post('/sign/up', handlers.signUp);
router.get('/sign/out', handlers.signOut);

module.exports = router;
