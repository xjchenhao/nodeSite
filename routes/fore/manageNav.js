var manageNav = require('../../models/manageNav');

module.exports = function (app) {
    app.route('/')
        .get(function (req, res) {
            manageNav.fetch(function (err, manage) {
                if (err) {
                    console.log(err);
                }

                res.render('fore/manageNav', {
                    title: '管理平台首页',
                    manage: manage
                });
            });
        });
};