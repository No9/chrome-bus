var EventEmitter = require('events').EventEmitter
var util = require('util')

module.exports = ChromeBus
util.inherits(ChromeBus, EventEmitter)

var emit = EventEmitter.prototype.emit
var on = EventEmitter.prototype.on

function ChromeBus (opts) {
  if (!(this instanceof ChromeBus)) return new ChromeBus(opts)
  if (!opts) opts = {}

  var self = this
  EventEmitter.call(this)
  if (typeof opts === 'string') opts = { key: opts }
  if (opts.tagName === 'WEBVIEW') {
    this._key = 'chrome-bus'
    this.source = opts.contentWindow
    window.addEventListener('message', function (ev) {
      var value = JSON.parse(ev.data)
      if (Array.isArray(value)) emit.apply(self, value)
    })
  } else if (window.location.href.indexOf('#fragment') > -1) {
    this._key = 'chrome-bus'
    window.addEventListener('message', function (ev) {
      if (!self.source) {
        self.source = ev.source
      }
      var value = JSON.parse(ev.data)
      if (Array.isArray(value)) emit.apply(self, value)
    }, false)
  } else {
    this._key = opts.key || 'chrome-bus'
    chrome.runtime.onMessage.addListener(function (ev) { // eslint-disable-line
      if (ev.key === self._key) {
        try { var value = JSON.parse(ev.newValue) } catch (err) { return }
        if (Array.isArray(value)) emit.apply(self, value)
      }
    })
  }
}

ChromeBus.prototype.on = function (name, f) {
  on.apply(this, arguments)
}

ChromeBus.prototype.emit = function (name) {
  emit.apply(this, arguments)
  var args = [].slice.call(arguments)
  if (this.source) {
    this.source.postMessage([JSON.stringify(args)], '*')
  } else {
    if (window.location.href.indexOf('#fragment') > -1) {
      console.warn('This is a webview and the host page has not evented to it yet so the channel is not set up')
      return
    }
    chrome.runtime.sendMessage([JSON.stringify(args)]) // eslint-disable-line  
  }
  return this
}
