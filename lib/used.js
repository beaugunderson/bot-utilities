'use strict';

var bytewise = require('bytewise');
var levelup = require('levelup');
var timestamp = require('monotonic-timestamp');

var Used = module.exports = function (path) {
  this.db = levelup(path, {valueEncoding: 'binary'});
};

Used.prototype.used = function (value, cb) {
  var stream = this.db.createValueStream();

  stream.on('data', function (data) {
    if (bytewise.decode(data) !== value) {
      return;
    }

    // If we find the data it's used
    stream.destroy();

    cb(true);
  });

  stream.on('error', function (err) {
    throw err;
  });

  // If we haven't found the value yet it's unused
  stream.on('end', function () {
    cb(false);
  });
};

Used.prototype.use = function (value, cb) {
  this.db.put(timestamp(), bytewise.encode(value), cb);
};
