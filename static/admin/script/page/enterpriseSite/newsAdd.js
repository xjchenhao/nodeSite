define(function (require, exports, module) {
    require('jquery');

    require('css!libs/simditor/styles/simditor');
    var simditor=require('simditor');

    var editor = new simditor({
        textarea: $('#editor')
    });
});