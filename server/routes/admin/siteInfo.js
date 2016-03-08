var errorCatch = require('../../middleware/errorCatch');

var manageModule = require('../../models/module');
var siteInfo = require('../../models/siteInfo');

var _ = require('underscore');

// 更新模块目录缓存的方法
var getCatalogue = manageModule.getCatalogue;

module.exports = function (app) {
    app.route('/admin/system/siteInfo')

        .get(function (req, res) {
            getCatalogue().then(function () {
                res.render('admin/siteInfo', {
                    title: '系统信息',
                    siteInfo: siteInfo.info,
                    catalogue: manageModule.catalogue,
                    breadcrumb: manageModule.getBreadcrumb(req)
                });
            });
        })
        .post(function (req, res) {
            var siteInfoObj = req.body;
            var id = siteInfoObj._id;
            var _module;
            if (id !== 'undefined') {
                siteInfo.findById(id, function (err, module) {
                    if (err) {
                        errorCatch(req, res, err);
                        return false;
                    }

                    _module = _.extend(module, siteInfoObj);
                    _module.save(function (err, docs) {
                        if (err) {
                            console.log(err);
                        }
                        siteInfo.getSiteInfo();
                        res.redirect('/admin/system/siteInfo');
                    });
                });
            } else {
                _module = new siteInfo({
                    siteName: siteInfoObj.siteName,
                    companyName: siteInfoObj.companyName,
                    domain: siteInfoObj.domain,
                    installPath: siteInfoObj.installPath,
                    managePath: siteInfoObj.managePath,
                    attachmentPath: siteInfoObj.attachmentPath
                });

                _module.save(function (err, docs) {
                    if (err) {
                        errorCatch(req, res, err);
                        return false;
                    }

                    siteInfo.getSiteInfo();
                    res.redirect('/admin/system/siteInfo');
                });
            }
        });
};