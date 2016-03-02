var errorCatch = require('../../models/errorCatch'),
    pageUrl = require('../../public/scripts/page/qian360H5/url-map'),
    request = require('request');

var fs = require("fs");
var _ = require('underscore');

module.exports = function (app) {
    //--------------------------------------------------【后台部分】
    app.route('/h5')
        .get(function (req, res) {
            request({
                url: 'https://www.qian360.com/wap/common/home.html?oauthToken=&appId=20150720145313251618&service=home',
                method: 'POST',
                params: {
                    oauthToken: req.cookie && req.cookie['qz_h5_oauthToken'],
                    appId: pageUrl.appId,
                    service: pageUrl.home.service
                }
            }, function (error, response, data) {
                if (error) {
                    console.log(error);
                    return false;
                }

                if (!error && response.statusCode == 200) {
                    data=JSON.parse(data);

                    if (!data.resultCode) {
                        console.log(data);
                        return false;
                    }

                    res.render('qian360H5/home.tpl', _.extend({
                        title: '手机钱庄',
                        helpers:{
                            'helper-progressbar':function(){
                                if(this.brType==3){
                                    return 100;
                                }
                                return parseInt(this.accountYes / this.account*100);
                            },
                            'helper-proMark':function(){
                                if(this.brType==3){
                                    return new Handlebars.SafeString('<span>火爆</span><i class="icon icon-pro-mark red"></i>');
                                }
                                if(this.status==10){
                                    return new Handlebars.SafeString('<span>预售</span><i class="icon icon-pro-mark orange"></i>');
                                }
                                if(this.isNewHand==1){
                                    return new Handlebars.SafeString('<span>新手</span><i class="icon icon-pro-mark green"></i>');
                                }
                            }
                        }
                    }, data.resultData));
                }
            });
        });

    app.use('/image/common', function (req, res, next) {
        res.redirect('/images/qian360H5/common' + req.url);
    });

    app.use('/public/style', function (req, res, next) {
        res.redirect('/style' + req.url);
    });
};
