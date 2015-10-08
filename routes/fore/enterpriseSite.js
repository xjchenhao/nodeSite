module.exports = function (app) {
    app.route('/enterpriseSite')
        .get(function (req, res) {
            res.render('enterpriseSite', {
                title: '管理平台首页'
            });
        });
};