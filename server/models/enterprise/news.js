var mongoose = require('mongoose');
var newsSchema = require('../../schemas/enterprise/news');
var news = mongoose.model('enterprise-news', newsSchema);

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

obj.getClassify = function (classify) {
    return new Promise(function (resolve, reject) {
        var conditionObj = classify || {};

        newsClassify.find(conditionObj, function (err, docs) {
            if (err) {
                reject(err);
            }

            obj.data.classify = docs;
            resolve();
        });
    });
};

obj.getClassify();

module.exports = obj;