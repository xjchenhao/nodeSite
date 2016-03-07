require.config({
    baseUrl: '/admin/script',
    paths: {
        jquery: '../../libs/jquery/dist/jquery',
        bootstrap: '../../libs/bootstrap/dist/js/bootstrap.min',
        bootstrapTheme: '../../libs/AdminLTE/dist/js/app.min',
        fastclick: '../../libs/AdminLTE/plugins/fastclick/fastclick.min',
        pace: '../../libs/PACE/pace.min',
        marked: '../../libs/editor/src/editor',
        'marked-original': '../../libs/marked/lib/marked',
        simditor: '../../libs/simditor/lib/simditor'
    },
    map: {
        '*': {
            css: '../../libs/require-css/css'
        }
    },
    shim: {
        'bootstrap': {
            deps: ['jquery', 'css!../../libs/font-awesome/css/font-awesome.min.css']
        },
        'bootstrapTheme': ['jquery', 'bootstrap'],
        'metisMenu': {
            deps: ['jquery']
        },
        'pace': ['css!../../libs/PACE/themes/blue/pace-theme-center-simple.css'],
        'marked-original': {
            exports: 'marked'
        },
        'module/editor-markdown':{
            deps: ['marked-original', '../../../libs/editor/vendor/codemirror', '../../../libs/editor/src/intro'],
            exports: 'Editor'
        },
        'marked': {
            deps: ['marked-original', '../../libs/editor/vendor/codemirror', '../../libs/editor/src/intro'],
            exports: 'Editor'
        },
        'simditor': ['jquery', '../../libs/simple-module/lib/module', '../../libs/simple-hotkeys/lib/hotkeys', '../../libs/simple-uploader/lib/uploader', 'css!../../libs/simditor/styles/simditor']
    }
});

require(['page/base']);