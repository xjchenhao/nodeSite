var mongoose = require('mongoose');
var enterpriseNewsSchema = require('../../schemas/enterprise/news');
var enterpriseNews = mongoose.model('enterprise-news', enterpriseNewsSchema);

<<<<<<< Updated upstream
module.exports = enterpriseNews;
=======
var newsClassifySchema = require('../../schemas/enterprise/newsClassify');
var newsClassify = mongoose.model('enterprise-news-classify', newsClassifySchema);

var obj = {
    news: news,
    classify: newsClassify,
    data: {
        classify: null,
        list: null
    }
};

obj.getClassify = function (classify, func) {
    return new Promise(function (resolve, reject) {
        var conditionObj = classify || {};

        newsClassify.find(conditionObj, function (err, docs) {
            if (err) {
                reject(err);
            }

            obj.data.classify = docs;
            func && func();
            resolve();
        });
    });
};

obj.getClassify();

module.exports = obj;
>>>>>>> Stashed changes
