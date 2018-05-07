stoxum-lib-messagesigner
------------------------

This module exports a Message class which can sign arbitrary data. To use it you
must use the exported class factory, which injects the required stoxum-lib and
sjcl-extended dependencies.

```javascript
// import dependencies
var stoxumlib = require('stoxum-lib');
var sjcl = require('sjcl-extended');

// wire it all together
var messageFactory = require('stoxum-lib-messagesigner');
var Message = messageFactory(stoxumlib, sjcl);

// sign a message
var secret = 'safRpB5euNL52PZPTSqrE9gvuFwTC';
var msg = 'goodbye cruel world!';
var signature = Message.signMessage(msg, secret);

console.log(signature);
// AAAAG8rK+Ih6Oxf+kV5pHxjt9QPEaSNBgPUcBbzA9A5mI8ecC8YaWb3fxkUM4TVnI9EeP+JnGMN3BxEuHSmY2VBvy48=
```