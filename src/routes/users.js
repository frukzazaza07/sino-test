const router = require('express').Router(),
    {controller: usersController} = require('../controllers/usersController');

router.get('/', usersController.view);
router.post('/add', usersController.add);
router.get('/update/:id', usersController.updateView);
router.post('/update/:id', usersController.update);
router.get('/delete/:id', usersController.delete);

module.exports = router;

