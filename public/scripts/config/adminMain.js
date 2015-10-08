requirejs.config({
    baseUrl: '/scripts',
    paths: {
        module: 'module',
        page:'page/admin',
        libs:'../libs'
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