var mongoose = require('mongoose');
var enterpriseNewsSchema = require('../../schemas/enterprise/news');
var enterpriseNews = mongoose.model('enterprise-news', enterpriseNewsSchema);

module.exports = enterpriseNews;