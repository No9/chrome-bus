# chrome-bus
Share an event emitter among chrome runtime components

Because managing anonymous events is not fun

This module is used by [chromiumify](https://github.com/chromiumify)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## install
```
$ npm install chrome-bus
```

## usage

### basic

This usage is when you have a background page that you want to communicate to.

```js
var createBus = require('chrome-bus')
var bus = createBus()

bus.on('hello', function (msg) {
  console.log('msg=', msg)
})

bus.emit('hello', Date.now())
```

### webview

Communicating with webviews in chrome apps is not straight forward as a channel between the host page and the view needs to be created.

There is also no way for a page to know if it is being hosted in a webview. 

So there are conventions for working around this.

Below are the main parts you need to understand but see the sample app for a working sample

#### host page 
```js
var view = document.getElementById('wv') 
view.addEventListener('contentload', function (evt) { // You have to wait for the webview to load before attaching the eventbus
  var wvbus = createBus(view) // Pass in the webview when creating the bus
  wvbus.on('goodbye', function (msg) {
    assert.ok('Message Received')
    console.log('msg=', msg)
  })
  
  wvbus.emit('hello', Date.now())
})
```
In the HTML for the view ensure that the URI to the location of the view contains a bookmark to fragment

```html
<webview src="webview.html#fragment" id="wv" partition="wvevent" autosize="true" minwidth="500" minheight="450"></webview>
``` 

#### webview page

```js
var bus = createBus() // no additional parameter is allowed as the #fragment tag is used to create a namespace

bus.on('hello', function (msg) {
  assert.ok('Message Received')
  console.log('msg=', msg)
  bus.emit('goodbye', Date.now())
})
```