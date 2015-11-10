var errorCatch = require('../../models/errorCatch');

var enterpriseNews = require('../../models/enterprise/news');

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
<<<<<<< Updated upstream
        })
        .post(function (req, res) {

=======
        });
    app.route('/admin/enterpriseSite/newsClassify')
        .delete(function(req, res){
            var queryClassify = req.query.classify;  // 获得url上query的classify参数

            var filtrateNews = null;    // 获取该分类下的新闻列表

            for (var i = 0, l = newsModule.data.list; i < l; i++) {
                if (newsModule.data['list'][i].name == queryClassify) {
                    filtrateNews.push(newsModule.data['list'][i]);
                }
            }

            newsModule.classify.remove({_id: queryClassify}, function (err) {

                if (err) {
                    errorCatch(req, res, err);
                    return false;
                }

                if(!filtrateNews){
                    res.send({
                        resultCode: 0,
                        resultMsg: '该分类下存在内容,无法删除!'
                    });
                    return false;
                }

                newsModule.getClassify('',function(){
                    res.send({
                        resultCode: 1,
                        resultMsg: '删除成功'
                    });
                });
            });
        })

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
                        res.redirect('/admin/enterpriseSite/news');
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
>>>>>>> Stashed changes
        })
};