var errorCatch = require('../../models/errorCatch');
var handlebars=require('handlebars');

var multiparty = require('multiparty');
var fs = require('fs');
var _ = require('underscore');

var manageNav = require('../../models/manageNav');
var manageModule = require('../../models/module');

module.exports = function (app) {
    app.route(['/','/index.html'])
        .get(function (req, res) {
            manageNav.fetch(function (err, manage) {
                if (err) {
                    console.log(err);
                }

                handlebars.registerHelper("helper-footer", function () {
                    return new handlebars.SafeString('<p>hello world</p>');
                });

                res.render('project/manageNav.tpl', {
                    title: '管理平台首页',
                    manage: manage,
                    layout: false
                });
            });
        });

    app.route(['/ui','ui/index.html'])
        .get(function (req, res) {
            manageNav.fetch(function (err, manage) {
                if (err) {
                    console.log(err);
                }

                res.render('project/index.tpl', {
                    title: 'admin ui',
                    layout: false
                });
            });
        });

    app.route('/admin/manageNav')
        .get(function (req, res) {
            manageNav.fetch(function (err, manage) {
                if (err) {
                    console.log(err);
                }

                res.render('admin/project/manageNavList', {
                    title: '项目导航',
                    manage: manage,
                    catalogue: manageModule.catalogue,
                    breadcrumb: manageModule.getBreadcrumb(req)
                });
            });
        });

    app.route('/admin/manageNav/add')
        .get(function (req, res) {
            res.render('admin/project/manageNavAdd', {
                title: '添加项目',
                manage: {
                    projectName: '',
                    describeEn: '',
                    describeCn: '',
                    link: '',
                    orderBy: '',
                    icon:'',
                    image: ''
                },
                catalogue: manageModule.catalogue,
                breadcrumb: manageModule.getBreadcrumb(req)
            });
        })
        .post(function (req, res) {
            entryRecord(req, res);
        });

    app.route('/admin/manageNav')
        .delete(function (req, res) {
            var id = req.body._id;

            manageNav.findById(id, function (err, docs) {

                // 删除存储的图片
                if (docs.image) {
                    var imgPath = './upload/' + docs.image;
                    fs.unlink(imgPath, function (err) {
                        if (err) throw err;
                        console.log('remove ' + imgPath + ' succeed');
                    });
                }

                // 删除记录
                manageNav.remove({_id: id}, function (err) {
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
        });

    app.route('/admin/manageNav/update')
        .get(function (req, res) {

            var id = req.query.id;  // 获得url上query的id参数

            if (id) {
                manageNav.findById(id, function (err, manage) {
                    res.render('admin/project/manageNavAdd', {
                        title: '更新项目',
                        manage: manage,
                        catalogue: manageModule.catalogue,
                        breadcrumb: manageModule.getBreadcrumb(req)
                    });
                });
            }
        });
};

// 录入记录
function entryRecord(req, res) {

    //判断是否存在图片资源存放目录,不存在则创建
    if (!fs.existsSync('./upload/images/manageNav/')) {
        fs.mkdirSync('./upload/images/manageNav');
    }

    //生成multiparty对象，并配置下载目标路径
    var form = new multiparty.Form({uploadDir: './upload/images/manageNav/'});

    // 处理图片流媒体
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.image[0];
            var uploadedPath = inputFile.path;
            var dstPath = inputFile.originalFilename ? './upload/images/manageNav/' + inputFile.originalFilename : '';

            if (dstPath) {

                //重命名为真实文件名
                fs.rename(uploadedPath, dstPath, function (err) {
                    if (err) {
                        console.log('rename error: ' + err);
                    } else {
                        console.log('rename ok');
                    }
                });
            } else {
                //删除空的流文件
                fs.unlink(uploadedPath, function (err) {
                    if (err) throw err;
                    console.log('remove ' + uploadedPath + ' succeed');
                });
            }

            // 存储数据
            var id = fields._id[0],
                _manage;
            if (id !== 'undefined') {
                manageNav.findById(id, function (err, manage) {
                    if (err) {
                        console.log(err);
                    }

                    // 更新数据
                    _manage = _.extend(manage, {
                        projectName: fields.projectName[0],
                        describeEn: fields.describeEn[0],
                        describeCn: fields.describeCn[0],
                        link: fields.link[0],
                        orderBy: fields.orderBy[0],
                        icon:fields.icon[0],
                        image: inputFile.originalFilename ? 'images/manageNav/' + inputFile.originalFilename : manage.image
                    });

                    //数据存储后执行
                    _manage.save(function (err) {
                        if (err) {
                            console.log(err);
                        }

                        res.redirect('/admin/manageNav');
                    });
                });
            } else {
                // 存储数据
                _manage = new manageNav({
                    projectName: fields.projectName[0],
                    describeEn: fields.describeEn[0],
                    describeCn: fields.describeCn[0],
                    link: fields.link[0],
                    orderBy: fields.orderBy[0],
                    icon:fields.icon[0],
                    image: inputFile.originalFilename ? 'images/manageNav/' + inputFile.originalFilename : ''
                });

                //数据存储后执行
                _manage.save(function (err) {
                    if (err) {
                        console.log(err);
                    }

                    res.redirect('/admin/manageNav');
                });
            }
        }
    });
}