'use strict';

var bytewise = require('bytewise');
var levelup = require('levelup');
var sublevel = require('sublevel');

var Cache = module.exports = function (path) {
  this.db = sublevel(levelup(path, {
    keyEncoding: 'binary',
    valueEncoding: 'binary'
  }));
};

// Memoizes an asynchronous function to a sublevel db of the given name
// Based on the memoize function fron caolan/async
Cache.prototype.memoize = function (name, fn, hashFn) {
  var memo = this.db.sublevel(name);
  var queues = {};

  hashFn = hashFn || function (x) {
    return x;
  };

  function memoized() {
    var args = Array.prototype.slice.call(arguments);
    var callback = args.pop();
    var key = bytewise.encode(hashFn.apply(null, args));

    memo.get(key, function (err, value) {
      if (!err) {
        return callback.apply(null, bytewise.decode(value));
      }

      if (!err.notFound) {
        return callback.apply(err);
      }

      if (key in queues) {
        return queues[key].push(callback);
      }

      queues[key] = [callback];

      fn.apply(null, args.concat([function () {
        var fnArgs = Array.prototype.slice.call(arguments);

        memo.put(key, bytewise.encode(fnArgs), function (err) {
          var q = queues[key];
          delete queues[key];

          for (var i = 0, l = q.length; i < l; i++) {
            q[i].apply(err, fnArgs);
          }
        });
      }]));
    });
  }

  memoized.memo = memo;

  return memoized;
};
