module.exports = function (app) {

    /*
     * 根据环境变量
     * 判断是否需要进行登录判断
     * */

    var env = process.env.NODE_ENV || 'develop';
    env = env.toLowerCase();

    app.use('/admin', function (req, res, next) {

        if (env === 'production') {
            if (req.path !== '/login') {
                if (!req.session.loggedIn) {
                    res.redirect('/admin/login');
                    return false;
                }
            }
        }

        next();
    });

    //后台登录
    require('./admin/login')(app);

    //后台首页
    require('./admin/home')(app);

    //模块管理
    require('./admin/module')(app);

    //存储平台信息
    require('./admin/siteInfo')(app);

    //密码管理
    require('./admin/password')(app);

    //用户管理
    require('./admin/user')(app);

    //企业站路由
    require('./enterpriseSite/index')(app);

    //项目导航
    require('./project/manageNav')(app);

    //项目描述
    require('./project/describe')(app);

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