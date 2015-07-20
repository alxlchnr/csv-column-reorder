csv-column-reorder
==============
I often receive large CSV files for importing to postgre databases. I often struggle with random column orders of the csv files.
Therefore I descided to write this module and learn node by the way. This module allows to rearrange the columns of csv files, since tools like Excel struggle with large csv files.

### usage:
```javascript
var csv = require('./lib/csv-column-reorder.js');

var filePath = process.argv[2];
var newOrder = JSON.parse(process.argv[3]);
var options = process.argv[4];

csv.reorder(filePath, newOrder, options);
```
As this snippet is part of the starting point of the module it can be executed by command line.

### running tests
I'm using mocha, proxyquire and mock-fs for my tests.