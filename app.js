'use strict'
var csv = require('./lib/csv-column-reorder.js');

var exports = module.exports = {};

exports.reorder = csv.reorder;

var filePath = process.argv[2];
var newOrder = JSON.parse(process.argv[3]);
var separator = process.argv[4];

var callBack = function (err) {
    if (err) {
        console.log('something went wrong');
    } else {
        console.log('success');
    }
};
csv.reorder(filePath, newOrder, callBack, separator);