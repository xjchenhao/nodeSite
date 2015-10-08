module.exports = function (app) {
    app.route(['/enterpriseSite','/enterpriseSite/index.html'])
        .get(function (req, res) {
            res.render('enterpriseSite', {
                title: '管理平台首页'
            });
        });
};