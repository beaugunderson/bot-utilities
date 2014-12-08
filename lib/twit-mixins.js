'use strict';

var request = require('request');

module.exports = {
  updateWithMedia: function (options, imageBufferOrStream, cb) {
    var API_URL = 'https://upload.twitter.com/1.1/media/upload.json';

    var self = this;

    // First we post to media/upload.json
    request.post(API_URL, {
      oauth: {
        consumer_key: this.config.consumer_key,
        consumer_secret: this.config.consumer_secret,
        token: this.config.access_token,
        token_secret: this.config.access_token_secret
      },
      formData: {
        media: imageBufferOrStream
      },
      json: true
    }, function (err, response, body) {
      if (err) {
        return cb(err);
      }

      options.media_ids = body.media_id_string;

      // Then we post to statuses/update.json with the media_id from
      // media/upload.json
      self.post('statuses/update', options, cb);
    });
  }
};
