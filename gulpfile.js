var gulp = require('gulp');
var exec = require('child_process').exec;
var color = require('color');

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
});


// 一键启动
gulp
    .task('server', function () {
        new Promise(function (resolve, reject) {
            exec('mongod --dbpath=./db --port 27017', function (err) {
                if (err) {
                    console.log('\033[31m数据库连接error:\033[39m');
                    console.log(err);
                    reject(err);
                }
            });
            resolve();
        }).then(function () {
                new Promise(function (resolve, reject) {
                    //exec('forever stop app.js');
                    //exec('forever start app.js', function (err) {
                    exec('nodemon app.js', function (err) {
                        if (err) {
                            console.log('\033[31m站点启动error:\033[39m');
                            console.log(err);
                            reject(err);
                        }
                    });
                    resolve();
                })
            });

        console.log(' - 数据库连接');
        console.log(' - 站点启动');
    });