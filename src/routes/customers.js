const router = require('express').Router(),
    {controller: customersController} = require('../controllers/customersController');
    // {oldName: newName}
router.get('/', customersController.view);
router.post('/add', customersController.add);
router.post('/search', customersController.search);
router.get('/update/:id', customersController.updateView);
router.post('/update/:id', customersController.update);
router.get('/delete/:id', customersController.delete);

module.exports = router;

