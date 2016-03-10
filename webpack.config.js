var webpack = require('webpack'),
    glob=require('glob');

var entryObj=glob.sync('./static/admin/script/page/**.js'),
    formatEntry={};

entryObj.forEach(function(val){
    var reg=/(.*\/)(.*)\.js/i;
    if(reg.test(val)){
        formatEntry[RegExp.$2]=val;
    }
});

var chunks = Object.keys(formatEntry);
module.exports = {
    //插件项
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 将公共模块提取，生成名为`common`的chunk
            chunks: chunks,
            minChunks: 2 // 提取所有entry共同依赖的模块
        }),
        new webpack.ProvidePlugin({
            //mobilebone : './.www/script/mobilebone.js'
        })
    ],
    //页面入口文件配置
    entry: formatEntry,
    //入口文件输出配置
    output: {
        path: './static/admin/script/pkg',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            //{ test: require.resolve("./app/script/fastclick"),  loader: "exports?FastClick"}
        ]
    },
    //配置模块映射关系
    resolve: {
        root: './static/admin/script', //绝对路径
        extensions: ['', '.js', '.json'],

        alias: {
            jquery: '../../../libs/jquery/dist/jquery',
            bootstrap: '../../../libs/bootstrap/dist/js/bootstrap.min',
            bootstrapTheme: '../../../libs/AdminLTE/dist/js/app.min',
            fastclick: '../../../libs/AdminLTE/plugins/fastclick/fastclick.min',
            pace: '../../../libs/PACE/pace.min',
            marked: '../../../libs/editor/src/editor',
            'marked-original': '../../../libs/marked/lib/marked',
            simditor: '../../../libs/simditor/lib/simditor'
        },

        // todo:webpack的shim功能模块还没有找到
        shim: {
            'bootstrap': {
                deps: ['jquery', 'css!../../../libs/font-awesome/css/font-awesome.min.css']
            },
            'bootstrapTheme': ['jquery', 'bootstrap'],
            'metisMenu': {
                deps: ['jquery']
            },
            'pace': ['css!../../../libs/PACE/themes/blue/pace-theme-center-simple.css'],
            'marked-original': {
                exports: 'marked'
            },
            'module/editor-markdown':{
                deps: ['marked-original', '../../../../libs/editor/vendor/codemirror', '../../../../libs/editor/src/intro'],
                exports: 'Editor'
            },
            'marked': {
                deps: ['marked-original', '../../../libs/editor/vendor/codemirror', '../../../libs/editor/src/intro'],
                exports: 'Editor'
            },
            'simditor': ['jquery', '../../../libs/simple-module/lib/module', '../../../libs/simple-hotkeys/lib/hotkeys', '../../../libs/simple-uploader/lib/uploader', 'css!../../../libs/simditor/styles/simditor']
        }
    },
    // 给页面`<script>`标签引入进来的js的全局变量配置别名
    externals:{
        "zepto": "$"
    }
};