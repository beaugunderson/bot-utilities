'use strict';

module.exports = {
  percentChance: function (percent) {
    return this.random(1, 100) <= percent;
  }
};
