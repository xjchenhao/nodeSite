var request = require('request'),
    _ = require('underscore');

var errorCatch = require('./errorCatch');

const TIMEOUT = 3000;

var midway = function (req, res, opts) {

    // 设置参数
    opts = _.extend({
        url: '',
        method: 'GET',
        data: null,
        render: '',
        renderData: '',
        callBack: ''
    }, opts);

    console.log(opts.method);

    switch (opts.method) {
        case 'GET':
            request.get({url: opts.url, timeout: TIMEOUT}, reqCallBack);
            break;
        case 'POST':
            request.post({url: opts.url, timeout: TIMEOUT, form: opts.data}, reqCallBack);
            break;
        default:
            console.log('错误的请求类型:' + opts.method);

            res.render('tips/error', {
                title: '错误的请求类型',
                message: opts.method,
                more: 'http://stackoverflow.com/search?q='+response.statusCode
            });
            return false;
    }

    function reqCallBack(error, response, data) {
        if (error) {
            errorCatch(req, res, error);
            return false;
        }

        if (response.statusCode !== 200) {
            res.render('tips/error', {
                title: response.statusCode,
                message: 'statusCode错误',
                more: 'http://stackoverflow.com/search?q=http+'+response.statusCode
            });
            return false;
        }

        if (!error) {
            data = JSON.parse(data);

            console.log(data);

            if (data.resultCode !=='success') {
                console.log(data);
                return false;
            }

            res.render(opts.render, _.extend(opts.renderData, data.resultData));

            opts.callBack && opts.callBack(data);
        }
    }

};

module.exports = midway;