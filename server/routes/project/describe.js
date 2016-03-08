var errorCatch = require('../../middleware/errorCatch');

var manageModule = require('../../models/module');

var fs=require("fs");

module.exports = function (app) {
    //--------------------------------------------------【后台部分】
    app.route('/admin/describe')
        .get(function (req, res) {
            res.render('admin/project/describe', {
                title: '项目描述',
                doc:fs.readFileSync("README.md","utf-8"),
                catalogue: manageModule.catalogue,
                breadcrumb: manageModule.getBreadcrumb(req)
            });
        })
        .post(function(req,res){
            var bodyObj = req.body;

            fs.writeFile('README.md',bodyObj.editor,function(){
                res.redirect('/admin/describe');
            });
        });

    //--------------------------------------------------【前台部分】
    app.route(['/projectHelp'])
        .get(function (req, res) {
            res.render('project/describe', {
                title: '项目帮助'
            });
        });
};
