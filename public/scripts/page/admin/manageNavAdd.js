define(function (require, exports, module) {
    require('jquery');

    var Verifyfrom = require('module/verifyfrom');

    var verifyfrom = new Verifyfrom({
        isBlurVerify: true,
        succeed: function (elm) {
            $(elm).parent().addClass('has-success').removeClass('has-error').find('.text-danger').remove();
        },
        failure: function (elm, errorMsg) {
            $(elm).parent().addClass('has-error').removeClass('has-success')
                .find('.text-danger').remove().end()
                .append('<p class="text-danger">' + errorMsg + '</p>');
        }
    });

    verifyfrom.add($('#projectName')[0], [{
        strategy: 'isNoEmpty',
        errorMsg: '请输入项目名'
    }]);

    verifyfrom.add($('#describeCn')[0], [{
        strategy: 'isNoEmpty',
        errorMsg: '请输入中文描述'
    }]);

    verifyfrom.add($('#describeEn')[0], [{
        strategy: 'isNoEmpty',
        errorMsg: '请输入英文描述'
    }]);

    verifyfrom.add($('#link')[0], [{
        strategy: 'isNoEmpty',
        errorMsg: '请输入超链接'
    }]);

    $('#submitBtn').on('click', function () {
        if (!verifyfrom.start()) {
            return false;
        }
        $('#manageNavForm').submit();
    });
});