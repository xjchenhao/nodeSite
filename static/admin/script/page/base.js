define(function (require, exports, module) {
    require('bootstrap');

    //--------------------------------------------------【页面加载状态】
    var pace = require('pace');
    pace.start({
        document: false
    });

    //--------------------------------------------------【侧栏导航管理】
    require('metisMenu');

    //侧栏收缩
    $('#side-menu').metisMenu();

    //--------------------------------------------------【title提示框美化】
    $('[data-toggle="tooltip"]').tooltip();

    //--------------------------------------------------【自适应布局】
    $(window).on('resize', function () {
        var topOffset = 50,
            width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100;
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $('#page-wrapper').css('min-height', (height) + 'px');
        }
    }).trigger('resize');

    //--------------------------------------------------【根据url展开侧栏导航】

    var url = window.location;
    $('#side-menu a').filter(function () {
        return this.href == url || url.href.indexOf(this.href) == 0;
    })
        .last().addClass('active')
        .parents('li').addClass('active');

});
