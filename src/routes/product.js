const router = require('express').Router(),
    {controller: productController} = require('../controllers/productController');

router.get('/', productController.view);
router.post('/add', productController.add);
router.get('/update/:id', productController.updateView);
router.post('/update/:id', productController.update);
router.get('/delete/:id', productController.delete);

module.exports = router;

