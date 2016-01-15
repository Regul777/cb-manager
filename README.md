# timeouts and intervals

clean up all timeouts and intervals at once

### Install

```bash
npm install cb-manager
```

### Usage

```js
var CbManager = require('cb-manager')

var cbm = CbManager()

var timeout = cbm.timeout(function(value) {
  console.log('timeout value = ' + value)
}, 1000, 'value')

// timeout 1000 ms with 2 repeats
var t2 = cbm.interval(function(value) {
  console.log('interval value = ' + value)
}, 1000, 2, 'value')

// Also you can use equal simple alias cbm.cb(...)
var cb = cbm.callback(function(value) {
  console.log('callback value = ' + value)
}, null, 'value')

cbm.clear(timeout) // clear the timeout
cbm.clear(interval) // clear the interval
cbm.clear(cb) // block callback execution
cb() // No reaction, because callback is blocked

cbm.clearAll() // clear all timeouts, intervals and block all callbacks created by this instance

...

http.get(options, cmb.cb(function(res) {
  ...
}));

// Block callback execution
cmb.clearAll();
```