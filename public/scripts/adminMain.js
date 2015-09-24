requirejs.config({
    baseUrl: '/scripts',
    paths: {
        module: 'module',
        page:'page/admin',
        libs:'../libs'
    }
});

require(['page/base']);