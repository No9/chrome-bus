chrome.app.runtime.onLaunched.addListener(function () { // eslint-disable-line
  chrome.app.window.create('index.html', { // eslint-disable-line
    'bounds': {
      'width': 400,
      'height': 500
    }
  })
})

var test = require('tape').test
var createBus = require('../../')
var bus = createBus()

test('Background call', function (t) {
  bus.on('hellobackground', function (msg) {
    t.ok(!isNaN(msg), 'number returned')
    t.end()
    console.log('msg=', msg)
  })
})