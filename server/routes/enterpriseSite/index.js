var errorCatch = require('../../middleware/errorCatch');//错误捕捉

var newsModule = require('../../models/enterprise/news'); //新闻发布系统模块
var manageModule = require('../../models/module');  //后台模块管理,用来做侧栏的导航

var _ = require('underscore');

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
            var queryClassify = req.query.classify;  // 获得url上query的classify参数

            var filtrateNews = null;

            for (var i = 0, l = newsModule.data.list; i < l; i++) {
                if (newsModule.data['list'][i].name == queryClassify) {
                    filtrateNews.push(newsModule.data['list'][i]);
                }
            }

            res.render('admin/enterpriseSite/newsList', {
                title: '新闻管理',
                catalogue: manageModule.catalogue,
                breadcrumb: manageModule.getBreadcrumb(req),
                classify: newsModule.data.classify,
                classifyId:queryClassify,
                classifyParent: 0,
                news: queryClassify ? filtrateNews : newsModule.data.list
            });
        });
    app.route('/admin/enterpriseSite/news/add')
        .get(function (req, res) {
            res.render('admin/enterpriseSite/newsAdd', {
                title: '添加',
                catalogue: manageModule.catalogue,
                breadcrumb: manageModule.getBreadcrumb(req),
                classify: newsModule.data.classify,
                classifyParent: 0,
                news: newsModule.data.list
            });
        });
    app.route('/admin/enterpriseSite/news/classifyName')
        .post(function (req, res) {
            var id = req.body.classify._id;
            var bodyClassify = req.body.classify;
            var _newsModule;
            if (id !== 'undefined') {
                newsModule.classify.findById(id, function (err, module) {
                    if (err) {
                        errorCatch(req, res, err);
                        return false;
                    }

                    _newsModule = _.extend(module, bodyClassify);
                    _newsModule.save(function (err, docs) {
                        if (err) {
                            console.log(err);
                        }

                        newsModule.getClassify();
                        res.redirect('/admin/system/module');
                    });
                });
            } else {
                _newsModule = new newsModule.classify({
                    name: bodyClassify.name,            // 名称
                    parent: bodyClassify.parent         // 父级板块的id,有几个默认值 0:新闻系统
                });

                _newsModule.save(function (err, docs) {
                    if (err) {
                        errorCatch(req, res, err);
                        return false;
                    }

                    newsModule.getClassify();
                    res.redirect('/admin/enterpriseSite/news');
                });
            }
        })
};