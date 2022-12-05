const usersRoute = require('./users');
const customerRoute = require('./customers');
const productCategoryRoute = require('./productCategory');
const productRoute = require('./product');
const orderRoute = require('./order');
const authenRoute = require('./authen');
const {checkLogin, isLogin} = require('./middleware');
const router = require('express').Router();

router.use('/users', checkLogin, usersRoute);
router.use('/customers', checkLogin, customerRoute);
router.use('/product-category', checkLogin, productCategoryRoute);
router.use('/product', checkLogin, productRoute);
router.use('/pos', checkLogin, orderRoute);
router.use('/order', checkLogin, orderRoute);
router.use('/authen', isLogin, authenRoute);

module.exports = router;