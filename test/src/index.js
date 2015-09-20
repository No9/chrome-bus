var assert = require('assert')
var createBus = require('../../')
var bus = createBus()

bus.on('hello', function (msg) {
  assert.ok('Message Received')
  console.log('msg=', msg)
})

bus.emit('hello', Date.now())
