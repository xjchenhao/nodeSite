module.exports = function (app) {
    app.route(['/projectHelp'])
        .get(function (req, res) {
            res.render('project/help.jade', {
                title: '项目帮助'
            });
        });
};