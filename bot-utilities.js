'use strict';

var exit = require('exit');
var _ = require('lodash');

var HEY_YOU = exports.HEY_YOU = [
  '→', // Right arrow
  '👋', // Waving hand
  '✨', // Sparkles
  '👉', // Pointing finger
  '👏', // Clapping
  '🙌', // Up top
  '✌', // Peace
  '👀', // Eyes
  'ツ' // Smile
];

exports.heyYou = function (optionalScreenName) {
  if (optionalScreenName) {
    return _.sample(HEY_YOU) + ' @' + optionalScreenName;
  }

  return _.sample(HEY_YOU);
};

var IMAGE_BOTS = exports.IMAGE_BOTS = [
  'a_quilt_bot',
  'badpng',
  'cgagraphics',
  'Lowpolybot',
  'pixelsorter',
  'plzrevisit'
];

exports.imageBot = function () {
  return _.sample(IMAGE_BOTS);
};

// TODO: Should this be a Twit mixin?
exports.getTwitterAuthFromEnv = function () {
  return {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  };
};

exports.randomCommand = function (command) {
  return function (options) {
    if (options.random) {
      if (_.percentChance(98)) {
        console.log('Skipping...');

        exit(0);
      }
    }

    command(options);
  };
};

exports.lodashMixins = require('./lib/lodash-mixins.js');
exports.twitMixins = require('./lib/twit-mixins.js');
