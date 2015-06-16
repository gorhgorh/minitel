var Minitel = require('./minitel');
var minitel = new Minitel({
  port:'/dev/cu.usbserial-A9M5DF7B',
//  txtFile:'ascii/test.txt',
  speed:4800
});

//events

// event fired when the module open the serial communication to the minitel
minitel.on('ready', function () {
  console.log('serial port is open !!! modulo.js');
  minitel.emit('txtFile','ascii/test.txt');
});


