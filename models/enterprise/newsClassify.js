var mongoose = require('mongoose');
var newsClassifySchema = require('../../schemas/enterprise/newsClassify');
var newsClassify = mongoose.model('enterprise-news-classify', newsClassifySchema);

module.exports = newsClassify;