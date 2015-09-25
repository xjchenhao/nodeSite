module.exports = function (app) {

    /*
    * 后台部分
    * */

    //判断登录
    app.use('/admin', function (req, res, next) {

        //
        //if (req.path !== '/login') {
        //    if (!req.session.loggedIn) {
        //        res.redirect('/admin/login');
        //        return false;
        //    }
        //}

        next();
    });

    //管理系统导航后台页面
    require('../routes/admin/manageNav')(app);

    //后台登录
    require('../routes/admin/login')(app);

    //后台首页
    require('../routes/admin/home')(app);

    //模块管理
    require('../routes/admin/module')(app);

    //存储平台信息
    require('../routes/admin/siteInfo')(app);

    /*
     * 前台部分
     * */

    //管理系统导航前台页面
    require('../routes/fore/manageNav')(app);

    app.get('*', function(req, res){
        res.render('fore/tips/404', {
            title: 'No Found'
        })
    });

    return function (req, res, next) {
        next();
    };
};