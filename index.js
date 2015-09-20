var EventEmitter = require('events').EventEmitter
var util = require('util')

module.exports = ChromeBus
util.inherits(ChromeBus, EventEmitter)

var emit = EventEmitter.prototype.emit
var on = EventEmitter.prototype.on

function ChromeBus (opts) {
  if (!(this instanceof ChromeBus)) return new ChromeBus()
  if (!opts) opts = {}
  var self = this
  EventEmitter.call(this)
  if (typeof opts === 'string') opts = { key: opts }
  this._key = opts.key || 'chrome-bus'
  chrome.runtime.onMessage.addListener(function (ev) { // eslint-disable-line
    if (ev.key === self._key) {
      try { var value = JSON.parse(ev.newValue) } catch (err) { return }
      if (Array.isArray(value)) emit.apply(self, value)
    }
  })
}

ChromeBus.prototype.on = function (name, f) {
  on.apply(this, arguments)
}

ChromeBus.prototype.emit = function (name) {
  emit.apply(this, arguments)
  var args = [].slice.call(arguments)
  // var msg = { name : this._key, args : args }
  chrome.runtime.sendMessage([JSON.stringify(args)]) // eslint-disable-line
  return this
}
