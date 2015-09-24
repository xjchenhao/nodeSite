var multiparty = require('multiparty');
var fs = require('fs');
var _ = require('underscore');

var manageNav = require('../../models/manageNav');
var manageModule = require('../../models/module');

module.exports = function (app) {

    app.route('/admin/manageNavList')
        .get(function (req, res) {
            showRecord(req, res);
        });

    app.route('/admin/manageNav/add')
        .get(function (req, res) {
            res.render('admin/manageNavAdd', {
                title: '添加项目',
                manage: {
                    projectName: '',
                    describeEn: '',
                    describeCn: '',
                    link: '',
                    orderBy: '',
                    image: ''
                },
                catalogue: manageModule.catalogue
            });
        })
        .post(function (req, res) {
            entryRecord(req, res);
        });

    app.route('/admin/manageNav')
        .delete(function (req, res) {
            deleteRecord(req, res);
        });

    app.route('/admin/manageNav/:id')
        .get(function (req, res) {
            var id = req.params.id;

            if (id) {
                manageNav.findById(id, function (err, manage) {
                    res.render('admin/manageNavAdd', {
                        title: '更新项目',
                        manage: manage,
                        catalogue: manageModule.catalogue
                    });
                });
            }
        });
};

// 录入记录
function entryRecord(req, res) {
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
                        image: inputFile.originalFilename ? 'images/manageNav/' + inputFile.originalFilename : manage.image
                    });

                    //数据存储后执行
                    _manage.save(function (err, manage) {
                        if (err) {
                            console.log(err);
                        }

                        res.redirect('/admin/manageNavList');
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
                    image: inputFile.originalFilename ? 'images/manageNav/' + inputFile.originalFilename : ''
                });

                //数据存储后执行
                _manage.save(function (err, manage) {
                    if (err) {
                        console.log(err);
                    }

                    res.redirect('/admin/manageNavList');
                });
            }
        }
    });
}

// 删除记录
function deleteRecord(req, res) {
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
        manageNav.remove({_id: id}, function (err, docs) {
            if (err) {
                console.log(err);
            }
            console.log('删除成功');
            res.send(docs);
        });
    });
}

// 显示记录
function showRecord(req, res) {
    manageNav.fetch(function (err, manage) {
        if (err) {
            console.log(err);
        }

        res.render('admin/manageNavList', {
            title: '管理平台首页',
            manage: manage,
            catalogue: manageModule.catalogue
        });
    });
}

