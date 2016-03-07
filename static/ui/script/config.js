require.config({
    baseUrl: '/ui/script',
    paths: {
        jquery: '../../libs/jquery/dist/jquery',
        treeview: '../../libs/bootstrap-treeview/dist/bootstrap-treeview.min',
        bootstrap: '../../libs/bootstrap/dist/js/bootstrap.min',
        bootstrapTheme:'../../libs/AdminLTE/dist/js/app.min'
    },
    map: {
        '*': {
            css: '../../libs/require-css/css'
        }
    },
    shim: {
        'bootstrap': {
            deps: ['jquery', 'css!../../libs/font-awesome/css/font-awesome.min.css','css!../../libs/AdminLTE/dist/css/AdminLTE.min.css','css!../../libs/AdminLTE/dist/css/skins/_all-skins.min.css']
        },
        'bootstrapTheme':['jquery','bootstrap'],
        'treeview': {
            deps: ['jquery', 'css!../../libs/bootstrap-treeview/dist/bootstrap-treeview.min.css']
        }
    }
});

require(['page/base']);