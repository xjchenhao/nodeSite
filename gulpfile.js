var gulp = require('gulp');
var webpack=require('webpack');

var webpackConfig = require("./webpack.config.js"); //引入webpack的配置

gulp.task("webpack", function(callback) {
    var myConfig = Object.create(webpackConfig);
    return webpack(
        // configuration
        myConfig
        , function(err, stats) {
            // if(err) throw new gutil.PluginError("webpack", err);
            // gutil.log("[webpack]", stats.toString({
            //	 // output options
            // }));
            //callback();
        });
});