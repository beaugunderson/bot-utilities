'use strict';

var async = require('async');
var path = require('path');
var should = require('chai').should();
var rimraf = require('rimraf');

var Cache = require('..').Cache;

var PATH = path.join(__dirname, 'memoize');

var ABC = 'abc';
var DEF = 'def';

rimraf.sync(PATH);

var cache = new Cache(PATH);

function asyncFn(key, cb) {
  setTimeout(function () {
    cb(null, key + DEF);
  }, 50);
}

describe('Cache', function () {
  describe('memoize()', function () {
    it('should memoize an async function correctly', function (cb) {
      var memoizedFn = cache.memoize('asyncFn', asyncFn);

      asyncFn(ABC, function (ignoredErr, result) {
        result.should.equal(ABC + DEF);

        async.times(5, function (nKey, nextKey) {
          async.times(50, function (n, next) {
            memoizedFn(nKey + ABC, function (err, result) {
              if (err) {
                return cb(err);
              }

              should.equal(result, nKey + ABC + DEF);

              next();
            });
          }, function (err) {
            nextKey(err);
          });
        }, function (err) {
          cb(err);
        });
      });
    });
  });
});
