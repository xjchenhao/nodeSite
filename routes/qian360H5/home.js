var errorCatch = require('../../models/errorCatch'),
    pageUrl = require('../../static/qian360H5/script/page/url-map'),
    midway = require('../../static/qian360H5/script/module/midway'),
    request = require('request');

var fs = require("fs");
var _ = require('underscore');

module.exports = function (app) {
    //--------------------------------------------------【后台部分】
    app.route('/h5')
        .get(function (req, res) {

            midway(req,res,{
                url: 'http://10.0.1.90:8081/auth/users/1',
                data:{
                    email:123,
                    loginName:123123,
                    passwd:123123,
                    realName:55,
                    tel:123123
                },
                method: 'GET',
                render:'qian360H5/home.tpl',
                renderData:{
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
                }
            });
        });
};
