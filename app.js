'use strict'
var csv = require('./lib/csv-column-reorder.js');

var exports = module.exports = {};

exports.reorder = csv.reorder;

var filePath = process.argv[2];
var newOrder = JSON.parse(process.argv[3]);
var options = process.argv[4];

csv.reorder(filePath, newOrder, options);