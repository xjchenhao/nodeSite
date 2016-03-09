var path = require('path');

var log4js = require('log4js'),
    mass_fs = require('mass_fs');

var helper = {};

module.exports = helper;

//--------------------------------------------------【创建日志目录】
mass_fs.mkdir('./logs/access');
mass_fs.mkdir('./logs/console');

//--------------------------------------------------【规则配置】
log4js.configure({
    appenders: [
        {type: 'console'},
        {
            type: 'dateFile',
            filename: "./logs/access/access.log",
            "pattern": "yyyyMMdd.log",
            alwaysIncludePattern: false,
            maxLogSize: 1024,
            backups: 3,
            category: 'access'
        },
        {
            type: 'dateFile',
            filename: "./logs/console/console.log",
            "pattern": "yyyyMMdd.log",
            alwaysIncludePattern: false,
            maxLogSize: 1024,
            backups: 3,
            category: 'console'
        }
    ],
    replaceConsole: true
});

//--------------------------------------------------【请求/访问日志】
var accessLog = log4js.getLogger('access');
accessLog.setLevel('INFO');

// 访问日志
helper.accessLog = accessLog;

// 请求日志
helper.use = function (app) {
    app.use(log4js.connectLogger(accessLog, {level: log4js.levels.INFO}));
};

//--------------------------------------------------【记录控制台日志】
var console = log4js.getLogger('console');
console.setLevel('ERROR');