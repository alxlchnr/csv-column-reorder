'use strict';
var proxyquire = require('proxyquire');
var mock = require('mock-fs');
var assert = require('assert');
var sinon = require('sinon');

suite('csv-column-reorder test', function () {

    var array_reorder_stub = {};
    var fs_stub = {};

    var sut = proxyquire('../lib/csv-column-reorder.js', {'array_reorder': array_reorder_stub, 'fs': fs_stub});
    suiteSetup(function () {
        mock({
            'path/to/file/test.csv': mock.file({content: 'Id;Name;ChangedAt\n1;Test;2015-07-19'})
        });
    });

    test('call array_reorder and fs.appendFile', function (done) {
        var newOrder = {0: 1, 1: 0};
        var resultPath = 'path/to/file/test.csv' + '_reordered';
        array_reorder_stub.reorder = sinon.stub();
        array_reorder_stub.reorder.withArgs(['Id', 'Name', 'ChangedAt'], newOrder).returns(['Name', 'Id']);
        array_reorder_stub.reorder.withArgs(['1', 'Test', '2015-07-19'], newOrder).returns(['Test', '1']);
        array_reorder_stub.reorder.throws();

        fs_stub.appendFile = sinon.spy();

        sut.reorder('path/to/file/test.csv', newOrder, function (err) {
            assert(!err);
            assert(array_reorder_stub.reorder.calledTwice);
            assert(fs_stub.appendFile.calledTwice);
            assert.equal(fs_stub.appendFile.firstCall.args[0], resultPath);
            assert.equal(fs_stub.appendFile.firstCall.args[1], 'Name;Id\n');
            assert.equal(fs_stub.appendFile.secondCall.args[0], resultPath);
            assert.equal(fs_stub.appendFile.secondCall.args[1], 'Test;1\n');
            done(err);
        });

    });
});