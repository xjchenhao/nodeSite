var errorCatch = require('../../models/errorCatch');

var enterpriseNews = require('../../models/enterpriseNews');

// enterpriseNews


var manageModule = require('../../models/module');

module.exports = function (app) {
    app.route('/enterpriseSite')
        .get(function (req, res) {
            res.redirect('/enterpriseSite/index.html');
        });

    app.route('/enterpriseSite/index.html')
        .get(function (req, res) {
            res.render('enterpriseSite/index', {
                title: '杭州筑宝建材有限公司'
            });
        });

    app.route('/enterpriseSite/about.html')
        .get(function (req, res) {
            res.render('enterpriseSite/about', {
                title: '走进筑宝 - 杭州筑宝建材有限公司'
            });
        });

    app.route('/enterpriseSite/superiority.html')
        .get(function (req, res) {
            res.render('enterpriseSite/superiority', {
                title: '筑宝优势 - 杭州筑宝建材有限公司'
            });
        });

    app.route('/enterpriseSite/products.html')
        .get(function (req, res) {
            res.render('enterpriseSite/products', {
                title: '产品中心 - 杭州筑宝建材有限公司'
            });
        });

    app.route('/enterpriseSite/example.html')
        .get(function (req, res) {
            res.render('enterpriseSite/example', {
                title: '工程案例 - 杭州筑宝建材有限公司'
            });
        });

    app.route('/enterpriseSite/news.html')
        .get(function (req, res) {
            res.render('enterpriseSite/news', {
                title: '新闻中心 - 杭州筑宝建材有限公司'
            });
        });

    app.route('/enterpriseSite/contact.html')
        .get(function (req, res) {
            res.render('enterpriseSite/contact', {
                title: '联系我们 - 杭州筑宝建材有限公司'
            });
        });

    app.route('/enterpriseSite/newsShow.html')
        .get(function (req, res) {
            res.render('enterpriseSite/newsShow', {
                title: '新闻中心 - 杭州筑宝建材有限公司'
            });
        });

    app.use('/images', function (req, res, next) {
        res.set('Content-Type', 'image/png');
        res.redirect('/images/enterpriseSite' + req.url);
    });

    app.route('/admin/enterpriseSite/news')
        .get(function (req, res) {
            res.render('admin/enterpriseSite/newsList', {
                title: '新闻管理',
                catalogue: manageModule.catalogue,
                breadcrumb: manageModule.getBreadcrumb(req)
            });
        });
    app.route('/admin/enterpriseSite/news/add')
        .get(function (req, res) {
            res.render('admin/enterpriseSite/newsAdd', {
                title: '添加',
                catalogue: manageModule.catalogue,
                breadcrumb: manageModule.getBreadcrumb(req)
            });
        });
};