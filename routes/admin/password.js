var errorCatch = require('../../models/errorCatch');
var adminUser = require('../../models/adminUser');

var manageModule = require('../../models/module');

module.exports = function (app) {

    app.route('/admin/system/password')
        .get(function (req, res) {
            res.render('admin/password', {
                title: '修改密码',
                catalogue: manageModule.catalogue,
                breadcrumb: manageModule.getBreadcrumb(req)
            });
        })
        .post(function(req,res){
            var bodyObj=req.body;
            adminUser.findOne({userName: req.session.loggedIn, password: bodyObj.passwordOld}, function (err, doc) {
                if (err) {
                    errorCatch(req, res, err);
                    return false;
                }

                if (!doc){
                    res.send({
                        resultCode: 0,
                        errorCode: 1,
                        resultMsg: '原密码错误'
                    });
                    return false;
                }

                delete req.session.loggedIn;
                res.send({
                    resultCode: 1,
                    resultMsg: '密码修改成功'
                });
            });
        });
};