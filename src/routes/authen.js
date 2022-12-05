const router = require('express').Router(),
    authenController = require('../controllers/authenController');

router.get('/login', authenController.loginView);
router.post('/login', authenController.login);

module.exports = router;

