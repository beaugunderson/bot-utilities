'use strict';

require('chai').should();

var path = require('path');
var rimraf = require('rimraf');
var Used = require('..').Used;

var PATH = path.join(__dirname, 'strings');

rimraf.sync(PATH);

var strings = new Used(PATH);

var HELLO_WORLD = 'hello world';

describe('Used', function () {
  describe('used()', function () {
    it('should return false when an item has not been stored', function (cb) {
      strings.used(HELLO_WORLD, function (used) {
        used.should.equal(false);

        cb();
      });
    });

    it('should return true when an item as been stored', function (cb) {
      strings.use(HELLO_WORLD, function (err) {
        if (err) {
          return cb(err);
        }

        strings.use(HELLO_WORLD, function (err) {
          if (err) {
            return cb(err);
          }

          strings.used(HELLO_WORLD, function (used) {
            used.should.equal(true);

            cb();
          });
        });
      });
    });
  });
});
