requirejs.config({
    baseUrl: '/scripts',
    paths: {
        module: 'module',
        page: 'page/admin',
        libs: '../libs',
        jquery: '../libs/jquery/dist/jquery.min',
        marked: '../libs/marked/lib/marked'
    },
    shim: {
        'libs/bootstrap/dist/js/bootstrap.min': ['jquery'],
        'libs/metisMenu/dist/metisMenu.min': ['jquery'],
        'module/markdown-editor': ['marked', 'libs/editor/vendor/codemirror', 'libs/editor/src/intro']
    },
    map: {
        '*': {
            css: 'libs/require-css/css'
        },
        'libs/pace/pace.min': {
            pace: 'libs/pace/pace.min'
        }
    }
});

require(['page/base']);