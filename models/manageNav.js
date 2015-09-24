var mongoose = require('mongoose');
var manageNavSchema = require('../schemas/manageNav');
var manageNav = mongoose.model('manage-nav', manageNavSchema);

module.exports = manageNav;