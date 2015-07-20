'use strict';
var fs = require('fs');
var array_reorder = require('array_reorder');
var readline = require("readline");

var exports = module.exports = {};

exports.reorder = function (filePath, newOrder, callBack, separator) {
    var startDate = new Date();
    var columnSeparator = separator ? separator : ';';
    var lineCounter = 0;

    var lineReader = readline.createInterface({
        input: fs.createReadStream(filePath)
    });


    lineReader.on('line', function (line) {
        lineCounter++;
        var reorderedLine = array_reorder.reorder(line.split(columnSeparator), newOrder);
        fs.appendFile(filePath + '_reordered', reorderedLine.join(columnSeparator) + '\n', function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
        });
    });

    lineReader.on('close', function () {
        if (callBack) {
            callBack();
        } else {
            console.log('reordered ' + lineCounter + ' lines in ' + (new Date() - startDate) + 'milliseconds.');
        }
    });
};

