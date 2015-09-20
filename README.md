# chrome-bus
Share an event emitter among chrome runtime components

Because managing anonymous events is not fun

This module is used by [chromiumify](https://github.com/chromiumify)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

### install
```
$ npm install chrome-bus
```

### usage

```js
var createBus = require('chrome-bus')
var bus = createBus()

bus.on('hello', function (msg) {
  console.log('msg=', msg)
})

bus.emit('hello', Date.now())
```

