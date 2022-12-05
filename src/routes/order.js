const router = require('express').Router(),
    orderController = require('../controllers/orderController');

router.get('/', orderController.view);
router.post('/add', orderController.add);
// router.get('/update/:id', orderController.updateView);
// router.post('/update/:id', orderController.update);
// router.get('/delete/:id', orderController.delete);

module.exports = router;

