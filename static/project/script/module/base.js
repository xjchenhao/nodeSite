define(function (require, exports, module) {
    require('bootstrap');
    require('adminLte');

    //--------------------------------------------------【页面加载状态】
    var pace = require('pace');
    pace.start({
        document: false
    });
    //--------------------------------------------------【初始化页面的样式】

    $(window).on("resize", function() {
        var topOffset = 50,
            width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;

        // 导航栏的默认显示隐藏
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100;
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        // 内容区域的默认最小高(不设置时与导航的分割线撑不开)
        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    }).trigger('resize');

});
