'use strict';

require('chai').should();

var botUtilities = require('..');
var _ = require('lodash');

_.mixin(botUtilities.lodashMixins);

function testPercentChance(percent, shouldBeCloseTo) {
  var TRIALS = 1000000;
  var passed = 0;

  for (var i = 0; i < TRIALS; i++) {
    if (_.percentChance(percent)) {
      passed++;
    }
  }

  var percentage = passed / TRIALS;

  percentage.should.be.closeTo(shouldBeCloseTo, 0.01);
}

describe('percentChance', function () {
  it('should behave correctly with percent 0', function () {
    testPercentChance(0, 0);
  });

  it('should behave correctly with percent 2', function () {
    testPercentChance(2, 0.02);
  });

  it('should behave correctly with percent 50', function () {
    testPercentChance(50, 0.5);
  });

  it('should behave correctly with percent 98', function () {
    testPercentChance(98, 0.98);
  });

  it('should behave correctly with percent 100', function () {
    testPercentChance(100, 1);
  });
});
