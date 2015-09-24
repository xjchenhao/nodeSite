var mongoose = require('mongoose');
var siteInfoSchema = require('../schemas/siteInfo');
var siteInfo = mongoose.model('site-info', siteInfoSchema);

module.exports = siteInfo;
