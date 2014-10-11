'use strict';

var request = require('request');

module.exports = {
  updateWithMedia: function (status, inReplyTo, imageBufferOrStream, callback) {
    var API_URL = 'https://api.twitter.com/1.1/statuses/update_with_media.json';

    var r = request.post(API_URL, {
      oauth: {
        consumer_key: this.config.consumer_key,
        consumer_secret: this.config.consumer_secret,
        token: this.config.access_token,
        token_secret: this.config.access_token_secret
      }
    }, callback);

    var form = r.form();

    form.append('status', status);

    if (inReplyTo) {
      form.append('in_reply_to_status_id', inReplyTo);
    }

    return form.append('media[]', imageBufferOrStream);
  }
};
