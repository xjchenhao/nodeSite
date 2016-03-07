module.exports = function (app) {

    // 判断环境
    var env = process.env.NODE_ENV || 'develop';
    env = env.toLowerCase();

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
    require('../routes/admin/login')(app);

    //qian360H5
    require('../routes/qian360H5/home')(app);

    //后台首页
    require('../routes/admin/home')(app);

    //模块管理
    require('../routes/admin/module')(app);

    //存储平台信息
    require('../routes/admin/siteInfo')(app);

    //密码管理
    require('../routes/admin/password')(app);

    //用户管理
    require('../routes/admin/user')(app);

    //企业站路由
    require('../routes/enterpriseSite/index')(app);

    //项目导航
    require('../routes/project/manageNav')(app);

    //项目描述
    require('../routes/project/describe')(app);

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