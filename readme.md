csv-column-reorder
==============
I often receive large CSV files for importing to postgre databases. I often struggle with random column orders of the csv files.
Therefore I descided to write this module and learn node by the way. This module allows to rearrange the columns of csv files, since tools like Excel struggle with large csv files.

### usage:
```javascript
var csv = require('./lib/csv-column-reorder.js');

var filePath = process.argv[2]; // path to your file
var newOrder = JSON.parse(process.argv[3]); //{0: 1, 1: 0} will exchange the second column of a csv file with the first
var separator = process.argv[4];

var callBack = function (err) {
    if (err) {
        console.log('something went wrong');
    } else {
        console.log('success');
    }
};
csv.reorder(filePath, newOrder, callBack,separator);
```
As this snippet is part of the starting point of the module it can be executed by command line.

### running tests
I'm using mocha, proxyquire, mock-fs and sinon for my tests.