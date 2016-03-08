var crypto = require('crypto');

var errorCatch = require('../../middleware/errorCatch');
var adminUser = require('../../models/adminUser');

var manageModule = require('../../models/module');

var _ = require('underscore');

module.exports = function (app) {

    app.route('/admin/system/user')
        .get(function (req, res) {
            res.render('admin/user', {
                title: '用户管理',
                catalogue: manageModule.catalogue,
                breadcrumb: manageModule.getBreadcrumb(req)
            });
        })
};