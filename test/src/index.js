var assert = require('assert')
var createBus = require('../../')
var bus = createBus()

bus.on('hello', function (msg) {
  assert.ok('Message Received')
  console.log('msg=', msg)
})

bus.emit('hello', Date.now())

var view = document.getElementById('wv')

view.addEventListener('contentload', function (evt) {
  var wvbus = createBus(view)
  wvbus.on('goodbye', function (msg) {
    assert.ok('Message Received')
    console.log('msg=', msg)
  })
  
  wvbus.emit('hello', Date.now())
})



