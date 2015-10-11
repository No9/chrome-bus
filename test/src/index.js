var test = require('tape').test
var createBus = require('../../')
var bus = createBus()

test('In page call', function (t) {
  bus.on('hello', function (msg) {
    t.ok(!isNaN(msg), 'number returned')
    t.end()
    console.log('msg=', msg)
  })
  
  bus.emit('hello', Date.now())
  bus.emit('hellobackground', Date.now())
  var view = document.getElementById('wv')
  
  view.addEventListener('contentload', function (evt) {
    var wvbus = createBus(view)
    wvbus.on('goodbye', function (msg) {
    t.ok(!isNaN(msg), 'number returned')
    t.end()
  })
  wvbus.emit('hello', Date.now())
  })
})
