define(function (require, exports, module) {
    require('jquery');

    //--------------------------------------------------【根据url识别父级导航】
    var hrefParameter=require('module/href-parameter'),
        parent_id=hrefParameter.get('parent_id');
    if(parent_id){
        $('#parentNav')[0].value=parent_id;
    }

    //--------------------------------------------------【表单校验】
    var Verifyfrom=require('module/verifyfrom');

    var verifyfrom=new Verifyfrom({
        isBlurVerify:true,
        succeed:function(elm){
            $(elm).parent().addClass('has-success').removeClass('has-error').find('.text-danger').remove();
        },
        failure:function(elm,errorMsg){
            $(elm).parent().addClass('has-error').removeClass('has-success')
                .find('.text-danger').remove().end()
                .append('<p class="text-danger">'+errorMsg+'</p>');
        }
    });

    verifyfrom.add($('#orderBy')[0],[{
        strategy:'isNoEmpty',
        errorMsg:'必填'
    }]);

    verifyfrom.add($('#title')[0],[{
        strategy:'isNoEmpty',
        errorMsg:'请输入标题'
    }]);

    //verifyfrom.add($('#icon')[0],[{
    //    strategy:'isNoEmpty',
    //    errorMsg:'请输入自定义图标的iconfont样式'
    //}]);

    verifyfrom.add($('#link')[0],[{
        strategy:'isNoEmpty',
        errorMsg:'请输入超链接地址'
    }]);

    $('#submitBtn').on('click', function () {
        if(!verifyfrom.start()){
            return false;
        }
        $('#formMain').submit();
    });
});