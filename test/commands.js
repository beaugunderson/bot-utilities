'use strict';

require('chai').should();

var botUtilities = require('..');
var _ = require('lodash');

_.mixin(botUtilities.lodashMixins);

botUtilities.exit = function () {};

function testRandomCommand(percentage) {
  var TRIALS = 1000000;
  var passed = 0;

  var command = botUtilities.randomCommand(function () {
    passed++;
  }, percentage);

  for (var i = 0; i < TRIALS; i++) {
    command({random: true});
  }

  var result = passed / TRIALS;

  result.should.be.closeTo(1 - ((percentage || 98) / 100), 0.01);
}

describe('randomCommand', function () {
  it('should work with a percentage specified', function () {
    testRandomCommand(75);
  });

  it('should work with no percentage specified', function () {
    testRandomCommand();
  });
});
