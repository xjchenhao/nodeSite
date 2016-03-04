requirejs.config({
    baseUrl: '/project/script',
    paths: {
        module: 'module',
        page: 'page',
        libs: '../../../libs',

        jquery: '../../../libs/jquery/dist/jquery',
        bootstrap: '../../../libs/bootstrap/dist/js/bootstrap.min',
        pace: '../../../libs/PACE/pace.min',
        adminLte:'../../../libs/AdminLTE/dist/js/app.min'
    },
    map: {
        '*': {
            css: 'libs/require-css/css'
        }
    },
    shim: {
        'bootstrap': {
            deps: ['jquery', 'css!libs/font-awesome/css/font-awesome.min.css','css!libs/AdminLTE/dist/css/AdminLTE.min.css','css!libs/AdminLTE/dist/css/skins/_all-skins.min.css']
        },
        'adminLte':['jquery','bootstrap'],
        'pace':['css!libs/PACE/themes/blue/pace-theme-minimal.css']
    }
});

require(['module/base']);