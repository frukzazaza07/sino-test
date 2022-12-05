
const controller = {},
    { query } = require('../db'),
    { getUserByUsernamePassword } = require('./usersController'),
    returnData = { status: true, message: [], results: [] },
    column = [
        'Name',
        'Surname',
        'Username',
        'Password',
        'Status',
    ];

controller.loginView = async (req, res) => {
    res.render('login');
};

controller.login = async (req, res, next) => {
    const results = await getUserByUsernamePassword(req.body.Username, req.body.Password);
    if (results.user.length == 0) {
        // console.log(results)
        req.flash('danger', 'Username or password invalid.');
        res.redirect('/authen/login');
        return;
    }

    req.session.userData = {isLogin: true, id: results.user[0].UserID, Name: results.user[0].Name};
    // console.log(req.session)
    res.redirect('/pos');
    res.end();
};


module.exports = controller;
