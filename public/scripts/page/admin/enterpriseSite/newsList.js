define(function (require, exports, module) {
    require('jquery');

    // 弹出悬浮框,添加修改分类
    $('#modifyModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        $(this)
            .find('.modal-title').text(button.data('title'))
            .end().find('.modal-body').addClass('hidden');
        $('#' + button.data('body')).removeClass('hidden').find('input:eq(0)')[0].focus();
    });

    //
});