var errorCatch = require('../../models/errorCatch');

var manageModule = require('../../models/module');

// 更新模块目录缓存的方法
var getCatalogue = manageModule.getCatalogue;

var _ = require('underscore');

module.exports = function (app) {

    app.route('/admin/system/module')

        .get(function (req, res) {
            getCatalogue().then(function () {
                res.render('admin/moduleList', {
                    title: '更新模块',
                    catalogue: manageModule.catalogue,
                    catalogueAll: manageModule.catalogueAll,
                    breadcrumb: manageModule.getBreadcrumb(req)
                });
            });
        })

        .delete(function (req, res) {
            var id = req.body._id;

            // 判断是否存在子集
            if (manageModule.isSubset(id)) {
                res.send({
                    resultCode: 0,
                    errorCode: 1,
                    resultMsg: '该项目存在父节点,无法删除'
                });
                return false;
            }

            manageModule.remove({_id: id}, function (err) {
                if (err) {
                    errorCatch(req, res, err);
                    return false;
                }

                res.send({
                    resultCode: 1,
                    resultMsg: '删除成功'
                });
            });
        });

    app.route('/admin/system/module/add')
        .get(function (req, res) {
            getCatalogue().then(function () {
                res.render('admin/moduleAdd', {
                    title: '添加模块',
                    module: {
                        icon: '',
                        title: '',
                        link: '',
                        isShow: true,
                        orderBy: '100',
                        parent: '',
                        note: ''
                    },
                    catalogue: manageModule.catalogue
                });
            });
        })

        .post(function (req, res) {
            var moduleObj = req.body.module;
            var _module;

            _module = new manageModule({
                icon: moduleObj.icon,
                title: moduleObj.title,
                link: moduleObj.link,
                isShow: moduleObj.isShow || false,
                orderBy: moduleObj.orderBy,
                parent: moduleObj.parent,
                note: moduleObj.note
            });

            _module.save(function (err, docs) {
                if (err) {
                    errorCatch(req, res, err);
                    return false;
                }

                res.redirect('/admin/system/module');
            });
        });

    app.route('/admin/system/module/:id')

        .get(function (req, res) {
            var id = req.params.id;
            getCatalogue().then(function () {
                if (id) {
                    manageModule.findById(id, function (err, docs) {
                        if (err) {
                            errorCatch(req, res, err);
                            return false;
                        }
                        res.render('admin/moduleAdd', {
                            title: '更新模块',
                            module: docs,
                            catalogue: manageModule.catalogue
                        });
                    });
                }
            });
        });
};