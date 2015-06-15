// test for using the minitel module

var options = {
  port:'/dev/cu.usbserial-A9M5DF7B',
  txtFile:'ascii/test.txt',
  speed:4800
};
var Minitel = require('./minitel.js');
var minitel = new Minitel(options);

//events

// event fired when the module open the serial com
minitel.on('spOpen', function () {
  console.log('serial port is open !!! modulo.js');
  // only seen by modulo.js
  minitel.emit('imagePath','ascii/test.txt');
  //minitel.readMsg(options.txtFile);
});

// event fired when a path for a text file is sent (does not bubble to minitel.js)
minitel.on('imagePath', function () {
  console.log('imagePath on modulo.js');
});
