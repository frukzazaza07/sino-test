const checkLogin = (req, res, next) =>{
    if(typeof req.session.userData == 'undefined' || req.session.userData.isLogin != true){
        req.flash("danger", "Login first.")
        res.redirect('/authen/login')
        return
    }
    next()
}
const isLogin = (req, res, next) =>{
    if(typeof req.session.userData != 'undefined' && req.session.userData.isLogin == true){
        res.redirect('/pos');
        return
    }
    next()
}

module.exports = {checkLogin, isLogin};