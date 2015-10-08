module.exports = function (app) {
    app.route(['/enterpriseSite', '/enterpriseSite/index.html'])
        .get(function (req, res) {
            res.render('enterpriseSite', {
                title: '管理平台首页'
            });
        });

    app.use('/images', function (req, res, next) {
        res.set('Content-Type', 'image/png');
        res.redirect('/images/enterpriseSite' + req.url);
    });
};