define(function (require, exports, module) {
    require('bootstrap');
    require('bootstrapTheme');

    //--------------------------------------------------【全局bug修复】
    var fastclick=require('fastclick');

    // 解决在微信上a标签:active伪类失效的bug
    window.addEventListener('touchstart', function () {
    }, false);

    // fastclick代替zepto的tap,防止点透bug
    fastclick.attach(document.body);

    //--------------------------------------------------【页面加载状态】
    var pace = require('pace');

    pace.start({
        document: false
    });

    //--------------------------------------------------【根据url展开侧栏导航】

    var url = window.location;
    $('#sidebar-menu a').filter(function () {
        return this.href == url || url.href.indexOf(this.href) == 0;
    })
        .last().addClass('active')
        .parents('li').addClass('active');

});
