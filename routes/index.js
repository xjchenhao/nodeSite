module.exports = function (app) {

    /*
     * 后台部分
     * */

    //判断登录
    app.use('/admin', function (req, res, next) {

        // todo:注释这个if代码块可以跳过登录的判断,方便开发调试
        if (req.path !== '/login') {
            if (!req.session.loggedIn) {
                res.redirect('/admin/login');
                return false;
            }
        }

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

    //项目描述修改
    require('../routes/admin/describe')(app);

    /*
     * 前台部分
     * */

    //企业站路由
    require('../routes/fore/enterpriseSite')(app);

    //管理系统导航
    require('../routes/project/manageNav')(app);

    //项目帮助
    require('../routes/project/help')(app);

    app.get('*', function (req, res) {
        var regNotHtml = /.*\.(jpg|png|gif|js|css|eot|woff|ttf|svg)/i;

        // 如果是非html文件的请求找不到,返回404
        if (!regNotHtml.test(req.url)) {
            res.render('tips/404', {
                title: 'No Found'
            })
        }
    });

    return function (req, res, next) {
        next();
    };
};