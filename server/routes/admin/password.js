var crypto = require('crypto');

var errorCatch = require('../../middleware/errorCatch');
var adminUser = require('../../models/adminUser');

var manageModule = require('../../models/module');

var _ = require('underscore');

module.exports = function (app) {

    app.route('/admin/system/password')
        .get(function (req, res) {
            res.render('admin/password', {
                title: '修改密码',
                catalogue: manageModule.catalogue,
                breadcrumb: manageModule.getBreadcrumb(req)
            });
        })

        .post(function (req, res) {
            var bodyObj = req.body;
            adminUser.findOne({
                userName: req.session.loggedIn,
                password: crypto.createHash('md5').update(bodyObj.passwordOld).digest('hex')
            }, function (err, doc) {
                if (err) {
                    errorCatch(req, res, err);
                    return false;
                }

                if (!doc) {
                    res.send({
                        resultCode: 0,
                        errorCode: 1,
                        resultMsg: '原密码错误'
                    });
                    return false;
                }

                adminUser = _.extend(doc, {'password': crypto.createHash('md5').update(bodyObj.passwordNew1).digest('hex')});
                adminUser.save(function (err) {
                    if (err) {
                        console.log(err);
                    }

                    delete req.session.loggedIn;
                    res.send({
                        resultCode: 1,
                        resultMsg: '密码修改成功'
                    });
                });
            });
        });
};