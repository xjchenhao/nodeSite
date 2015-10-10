var errorCatch = require('../../models/errorCatch');

var manageModule = require('../../models/module');

var fs=require("fs");

module.exports = function (app) {
    app.route('/admin/describe')
        .get(function (req, res) {
            res.render('admin/describe', {
                title: '项目描述',
                doc:fs.readFileSync("README.md","utf-8"),
                catalogue: manageModule.catalogue,
                breadcrumb: manageModule.getBreadcrumb(req)
            });
        });
};
