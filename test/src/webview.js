var test = require('tape').test
var createBus = require('../../')

test('web view test', function (t) {
  var bus = createBus()
  bus.on('hello', function (msg) {
    t.ok(!isNaN(msg), 'number returned')
    t.end()
    bus.emit('goodbye', Date.now())
  })
})
