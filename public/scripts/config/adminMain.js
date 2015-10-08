requirejs.config({
    baseUrl: '/scripts',
    paths: {
        module: 'module',
        page:'page/admin',
        libs:'../libs',
        jquery:'../libs/jquery/dist/jquery.min'
    },
    shim:{
        'libs/bootstrap/dist/js/bootstrap.min':['jquery'],
        'libs/metisMenu/dist/metisMenu.min':['jquery']
    },
    map: {
        '*': {
            css: 'libs/require-css/css'
        },
        'libs/pace/pace.min':{
            pace:'libs/pace/pace.min'
        }
    }
});

require(['page/base']);