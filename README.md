[![Build Status](https://travis-ci.org/beaugunderson/node-bot-utilities.svg?branch=master)](https://travis-ci.org/beaugunderson/node-bot-utilities)

## bot-utilities

Utilities for Twitter bots.

- `heyYou()`, a function that generates strings like `→ @username`
- `imageBot()`, a function that returns a random image input bot
- `getTwitterAuthFromEnv`, a function that returns an auth object suitable for
  use with `Twit`
- lodash mixins
  - `percentChance`, a function for doing things a percentage of the time
- twit mixins
  - `updateWithMedia`, a function for posting images to Twitter
