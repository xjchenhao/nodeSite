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
        'libs/pace/pace':{
            pace:'libs/pace/pace'
        }
    }
});

require(['page/base']);