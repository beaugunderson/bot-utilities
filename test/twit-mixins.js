'use strict';

require('dotenv').load();

var should = require('chai').should();

var botUtilities = require('..');
var fs = require('fs');
var path = require('path');
var Twit = require('twit');
var _ = require('lodash');

_.mixin(Twit.prototype, botUtilities.twitMixins);

describe('updateWithMedia', function () {
  it('should update with media from a buffer', function (cb) {
    var twit = new Twit(botUtilities.getTwitterAuthFromEnv());

    var buffer = fs.readFileSync(path.resolve(__dirname, 'kitten.jpg'));

    twit.updateWithMedia({status: 'Just testing...'}, buffer,
        function (err, data, result) {
      should.not.exist(err);
      should.not.exist(data.errors);

      result.statusCode.should.equal(200);

      data.extended_entities.media.should.have.length(1);

      cb();
    });
  });

  it('should update with media from a stream', function (cb) {
    var twit = new Twit(botUtilities.getTwitterAuthFromEnv());

    var stream = fs.createReadStream(path.resolve(__dirname, 'kitten.jpg'));

    twit.updateWithMedia({status: 'Just testing...'}, stream,
        function (err, data, result) {
      should.not.exist(err);
      should.not.exist(data.errors);

      result.statusCode.should.equal(200);

      data.extended_entities.media.should.have.length(1);

      cb();
    });
  });
});
