var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:String,            // 名称
    parent:String           // 父级板块的id,有几个默认值 0:新闻系统
});

module.exports = schema;