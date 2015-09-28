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
        }
    }
});

require(['page/base']);