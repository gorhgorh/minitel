var options = {
  port:'/dev/cu.usbserial-A9M5DF7B',
  txtFile:'ascii/j5.txt',
  speed:4800
};
var Minitel = require('./minitel.js');
var minitel = new Minitel(options);
var start = Date.now();


//events
minitel.on('spOpen', function myEventCb(str, num) {
  //console.log('serial port is open !!!', str, num, Date.now() - start);
    minitel.emit('imagePath','ascii/test.txt');
    //minitel.readMsg(options.txtFile);
});

minitel.on('imagePath', function () {
  console.log('imagePath on modulo.js');
});

// temporary fix (ensure serial port is opened with a timeout ... ugly but working)
setTimeout(function(){
  //minitel.readMsg(options.txtFile);
}, 1000);

//minitel.emit('spOpen', 'spOpen', "ma ma ma la");