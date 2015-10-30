var mongoose = require('mongoose');
var enterpriseNewsSchema = require('../schemas/enterpriseNews');
var enterpriseNews = mongoose.model('enterprise-news', enterpriseNewsSchema);

module.exports = enterpriseNews;