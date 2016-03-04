requirejs.config({
    baseUrl: '/admin/script',
    paths: {
        module: 'module',
        page: 'page',
        libs: '../../../libs',

        jquery: '../../../libs/jquery/dist/jquery',
        bootstrap: '../../../libs/bootstrap/dist/js/bootstrap.min',
        bootstrapTheme:'../../../libs/AdminLTE/dist/js/app.min',
        metisMenu: '../../../libs/metisMenu/dist/metisMenu.min',
        pace: '../../../libs/PACE/pace.min',
        marked: '../../../libs/marked/lib/marked',
        simditor: '../../../libs/simditor/lib/simditor'
    },
    map: {
        '*': {
            css: 'libs/require-css/css'
        }
    },
    shim: {
        'bootstrap': {
            deps: ['jquery', 'css!libs/font-awesome/css/font-awesome.min.css']
        },
        'bootstrapTheme':['jquery','bootstrap'],
        'metisMenu': {
            deps: ['jquery']
        },
        'pace':['css!libs/PACE/themes/blue/pace-theme-loading-bar.css'],
        'module/editor-markdown': ['marked', 'libs/editor/vendor/codemirror', 'libs/editor/src/intro'],
        'simditor': ['jquery', 'libs/simple-module/lib/module', 'libs/simple-hotkeys/lib/hotkeys', 'libs/simple-uploader/lib/uploader','css!libs/simditor/styles/simditor']
    }
});

require(['page/base']);