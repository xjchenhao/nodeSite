var errorCatch = require('../../models/errorCatch');

var manageModule = require('../../models/module');

module.exports = function (app) {
    app.route('/admin/describe')
        .get(function (req, res) {
            res.render('admin/describe', {
                title: '项目描述',
                doc:'',
                catalogue: manageModule.catalogue
            });
        });
};
