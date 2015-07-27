'use strict';
var fs = require('fs');
var array_reorder = require('array_reorder');
var LineByLineReader = require("line-by-line");

var exports = module.exports = {};

exports.reorder = function (filePath, newOrder, callBack, separator) {
    var startDate = new Date();
    var columnSeparator = separator ? separator : ';';
    var lineCounter = 0;
    if(filePath) {
        var lineReader = new LineByLineReader(filePath);


        lineReader.on('line', function (line) {
            lineCounter++;
            lineReader.pause();
            try {
                var reorderedLine = array_reorder.reorder(line.split(columnSeparator), newOrder);
                fs.appendFile(filePath + '_reordered', reorderedLine.join(columnSeparator) + '\n', function (err) {
                    if (err) {
                        console.log('error in line ' + lineCounter + ': ' + err);
                        throw err;
                    }
                    lineReader.resume();
                });
            } catch (err) {
                this.emit('error', err);
            }
        });
        lineReader.on('error', function (err) {
            if (callBack) {
                setTimeout(callBack(err), 0);
            }
        });
        lineReader.on('end', function () {
            if (callBack) {
                setTimeout(callBack(), 0);
            }
        });
    }else{
        callBack('file path needs to be specified');
    }
};

