define(function (require, exports, module) {
    require('libs/metisMenu/dist/metisMenu.min');
    $(function () {
        //侧栏收缩
        $('#side-menu').metisMenu();

        //title提示框美化
        $('[data-toggle="tooltip"]').tooltip();

        //自适应布局
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
    });
});
