var mongoose = require('mongoose');
var manageModuleSchema = require('../schemas/module');
var manageModule = mongoose.model('module', manageModuleSchema);

// 输出排序后的目录json
manageModule.catalogue = [];    // 缓存排除隐藏的模块json
manageModule.catalogueAll = []; // 缓存包含隐藏的模块json

// 判断是否存在子集
manageModule.isSubset = function (id) {
    var catalogue = manageModule.catalogueAll;
    var isExist = false;
    catalogue.forEach(function (obj) {
        if (obj.parent == id) {
            isExist = true;
            return false;
        }
    });
    return isExist;
};

// 生成面包屑数组

// 特殊的url链接映射
var specialUrlMap = {
    '/add': {
        title: '添加',
        link: 'javascript:;'
    },
    '/update': {
        title: '修改',
        link: 'javascript:;'
    }
};

manageModule.getBreadcrumb = function (req) {
    var catalogue = manageModule.catalogueAll,
        url = req.url,
        arr = [],

        findOne = function (id) {   // 根据id返回指定的目录对象
            var outputObj = null;
            catalogue.forEach(function (obj) {
                if (obj.id == id) {
                    outputObj = obj;
                    return false;
                }
            });
            return outputObj;
        },

        urlGetId = function (url) { // 根据url获取元素id
            var id = '';
            catalogue.forEach(function (obj) {
                if (obj.link == url) {
                    id = obj.id;
                    return false;
                }
            });
            return id;
        },

        collection = function (id) {    // 递归获得面包屑链接集合

            // 如果没有传当前id跳出函数
            if (!id) {
                return false;
            }

            var obj = findOne(id);

            arr.push({
                title: obj.title,
                link: obj.link
            });

            if (obj.parent != '0') {
                findOne(obj.parent) && collection(findOne(obj.parent).id);
            } else {
                arr.push({
                    title: 'Home',
                    link: '/admin'
                });
            }
        };

    var specialUrlReg = '';   //  甄别特殊url的正则

    for (var urlKey in specialUrlMap) {
        specialUrlReg = new RegExp('.*' + urlKey);
        if (specialUrlReg.test(url)) {
            arr.push({
                title: specialUrlMap[urlKey].title,
                link: specialUrlMap[urlKey].link
            });
            url=url.replace(urlKey,'');
        }
    }

    collection(urlGetId(url));

    // 返回存在面包屑数组,不存在返回undefined
    return arr.length && arr.reverse();
};

// 查表更新目录缓存
manageModule.getCatalogue = function () {
    var originalObj = null, // 未经处理的查询结果
        level = 1,
        findOne = function (id) {
            var outputObj = null;
            originalObj.forEach(function (obj) {
                if (obj.id == id) {
                    outputObj = obj;
                    return false;
                }
            });
            return outputObj;
        },
        subset = function (parentId) {    //根据父级id遍历子集
            var arr = [];

            // 查询该id下的所有子集
            originalObj.forEach(function (obj) {
                if (obj.parent == parentId) {
                    obj.level = level;
                    arr.push(obj);
                }
            });

            // 如果没有子集 直接退出
            if (arr.length == 0) {
                return false;
            }

            // 对子集进行排序
            arr.sort(function (val1, val2) {
                if (val1.orderBy < val2.orderBy) {
                    return -1;
                } else if (val1.orderBy > val2.orderBy) {
                    return 1
                } else {
                    return 0
                }
            });

            // 子集进行递归继续查询
            arr.forEach(function (obj) {
                obj.isShow && manageModule.catalogue.push(findOne(obj.id));
                manageModule.catalogueAll.push(findOne(obj.id));
                level++;
                subset(obj.id);
                level--;
            });
        };

    manageModule.catalogue.length = 0;
    manageModule.catalogueAll.length = 0;

    return new Promise(function (resolve, reject) {
        manageModule.find({}, function (err, docs) {
            if (err) {
                reject(err);
            }

            originalObj = docs;
            subset('0');
            resolve();
        });
    });
};

manageModule.getCatalogue();

module.exports = manageModule;
