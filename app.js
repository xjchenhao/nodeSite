var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var fs = require('fs');
var engines = require('consolidate');       // 解析模板引擎支持express

// 设置端口号
var port = process.env.NODE_PORT || process.argv[2] || 3000;

var app = express();

//连接本地数据库

/*
 * 注意命令行开启mangodb服务:
 * mongod --dbpath=./db --port 27017
 * ps:把数据库存放在了项目的根目录`bd`文件夹下,要确保`db`文件夹的存在
 * */

mongoose.connect('mongodb://127.0.0.1/manage');

mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

mongoose.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

//保存端口
app.set('port', port);

//视图文件的路径
app.set('views', path.join(__dirname, 'server/views/pages'));

//使用的模板引擎
app.engine('jade', engines.jade);
app.engine('tpl', engines.handlebars);


app.engine('tpl', handlebars.create({
    layoutsDir: './server/views/layout',
    partialsDir: './server/views/includes',
    defaultLayout: 'manage',
    extname: '.tpl'
}).engine);

app.set('view engine', 'jade');

//设置jade不换行
app.locals.pretty = true;

//中间件:获取body数据
app.use(bodyParser.urlencoded({extended: true}));   // extended默认为false,只能接受字符串或数组
app.use(bodyParser.json()); // 把返回值转成json格式

//中间件:session设置
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 1200000}  //session时长为20分钟
}));

// stylus编译
app.use(require("stylus").middleware({
    src: './static',
    compress: true
}));

//less编译
app.use(require('less-middleware')(path.join(__dirname, 'static')));

//静态资源的路径
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'upload')));

//日志:访问记录
var logHelper = require('./server/middleware/logHelper');
logHelper.use(app);

//页面路由
var routes = require('./server/routes');
app.use(routes(app));

//设置端口号
app.listen(port, function () {
    console.log('项目启动成功, 端口号: ' + port);
});