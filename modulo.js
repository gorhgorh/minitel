var Minitel = require('./minitel');
var minitel = new Minitel({
  port:'/dev/tty.usbserial-A9M5DF7B', // your path will be different
  speed:4800 // minitel defaults to 1200
});

// event fired when the module open the serial communication to the minitel
// do NOT call minitel method before it is fired
minitel.on('ready', function () {
  //minitel.wrChars('yo');
  minitel.wrFile('ascii/j5.txt');
});

minitel.on('keyPress', function (data) {
  console.log('key',data.toString(),'pressed on the keyboard');
});

