const router = require('express').Router(),
    dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', dashboardController.dashboard);
router.get('/all', dashboardController.getAllSeedsData);
// router.post('/import-csv', usersMiddleware.checkRegisterCount,customerController.save);
// router.get('/update/:id', customerController.edit);
// router.post('/update/:id', customerController.update);
// router.get('/delete/:id', customerController.delete);

module.exports = router;

