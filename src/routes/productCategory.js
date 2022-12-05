const router = require('express').Router(),
    {controller} = require('../controllers/productCategoryController');

router.get('/', controller.view);
router.post('/add', controller.add);
router.get('/update/:id', controller.updateView);
router.post('/update/:id', controller.update);
router.get('/delete/:id', controller.delete);

module.exports = router;

