'use strict';
var proxyquire = require('proxyquire').noPreserveCache();
var mock = require('mock-fs');
var assert = require('assert');

suite('csv-column-reorder test', function () {

    var array_reorder_stub = {};
    var fs_stub = {};

    var sut = proxyquire('../lib/csv-column-reorder.js', {'array_reorder': array_reorder_stub, 'fs': fs_stub});
    var appendCalls = 0;
    var reorderCalls = 0;
    var result = '';
    suiteSetup(function () {
        mock({
            'path/to/file/test.csv': mock.file({content: 'Id;Name;ChangedAt\n1;Test;2015-07-19'})
        });

    });

    test('call array_reorder and fs.appendFile', function () {
        var newOrder = {0: 1, 1: 0};
        var testFile = 'path/to/file/test.csv';
        array_reorder_stub.reorder = function (array, newOrderObject) {
            reorderCalls += 1;
            assert.equal(newOrderObject, newOrder);
            if (reorderCalls == 1) {
                assert.deepEqual(array, ['Id', 'Name', 'ChangedAt'], 'unexpected array for first reorder call');
                return ['Name', 'Id'];
            } else {
                assert.deepEqual(array, ['1', 'Test', '2015-07-19'], 'unexpected array for second reorder call');
                return ['Test', '1'];
            }
        };

        fs_stub.appendFile = function (filePath, data, callback) {
            appendCalls += 1;
            var expectedPath = testFile + '_reordered';
            assert.equal(filePath, expectedPath);
            if (appendCalls == 1) {
                assert.equal(data, 'Name;Id\n', 'unexpected data for new csv\'s header');
            } else {
                assert.equal(data, 'Test;1\n', 'unexpected data for first csv line');
            }
            result += data;
        };

        sut.reorder(testFile, newOrder, function () {
            assert.equal(reorderCalls, 2);
            assert.equal(appendCalls, 2);
            assert.equal(result, 'Name;Id\nTest;1');
        });

    });


    suiteTeardown(function () {
        mock.restore();
        reorderCalls = 0;
        appendCalls = 0;
    });

});