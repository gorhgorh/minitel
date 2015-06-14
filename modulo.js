/**
 * Node MINITEL or why use expensive lcd screens ?
 */
var util = require('util');
var options = {
  port:'/dev/cu.usbserial-A9M5DF7B',
  txtFile:'ascii/j5.txt',
  speed:4800
};
var Minitel       = require('./testEvents');
var minitel = new Minitel(options);
util.inspect(minitel);
console.log(minitel);
// minitel.on('open', function() {
//     console.log('♬ ♫♬');
// });
//console.log('listeners',util.inspect(minitel.listeners('open')));
//
