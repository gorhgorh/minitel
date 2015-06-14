var options = {
  port:'/dev/cu.usbserial-A9M5DF7B',
  txtFile:'ascii/j5.txt',
  speed:4800
};
var Minitel = require('./modul.js');
var minitel = new Minitel(options);
var start = Date.now();
console.log("minitel",minitel);

//no event emmiter things ...

minitel.on('spOpen', function myEventCb(str, num) {
  console.log('serial port is open !!!', str, num, Date.now() - start);
});

// temporary fix (ensure serial port is opened with a timeout ... ugly but working)
setTimeout(function(){
  minitel.readMsg(options.txtFile);
}, 1000);