var errorCatch = require('../../models/errorCatch');

var siteInfo = require('../../models/siteInfo');

var os=require('os');
var _ = require('underscore');

module.exports = function (app) {
    siteInfo.findOneData({},function(err,docs){
        if (err) {
            errorCatch(req, res, err);
            return false;
        }
        var _siteInfo=null;
        if(!docs){
            _siteInfo = new siteInfo({
                hostname: os.hostname(),
                type: os.type(),
                platform: os.platform(),
                release: os.release(),
                ip: getIp()
            });
        }else{
            _siteInfo = _.extend(docs, {
                hostname: os.hostname(),
                type: os.type(),
                platform: os.platform(),
                release: os.release(),
                ip: getIp()
            });
        }

        _siteInfo.save(function (err) {
            if (err) {
                errorCatch(req, res, err);
                return false;
            }
        });
    });

    function getIp() {
        var interfaces = os.networkInterfaces();
        var IPv4 = '127.0.0.1';
        for (var key in interfaces) {
            interfaces[key].forEach(function (details) {
                if (details.family == 'IPv4' && key == 'en0') {
                    IPv4 = details.address;
                }
            });
        }
        return IPv4;
    }
};