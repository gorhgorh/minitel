/*
 * minitel.js a dream come true in one color only (unless you have a minitel 2 !!!)
 */

var SerialPort  = require('serialport').SerialPort;
var lineReader  = require('line-reader');
var assert      = require('assert');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

// minitel codes
// TODO implement them ...
var ESC = '\x1b';
// Control sequence introducer
var CSI = ESC+'[';

// constructor func
function Minitel(options) {

  if (!(this instanceof Minitel)) return new Minitel();
  EventEmitter.call(this);
  var opts    = {};
  var self = this;

  // default options
  if (!options){
    console.log('you should at least provide a port !!!');
  }else {
    opts = options;
    if (!opts.txtFile){
      opts.txtFile = './ascii/j5.txt';
    }
    if(!opts.speed){
      opts.speed      = 1200;
    }
  }

  // serial com conf (DO NOT TOUCH THIS)
  var serialPort = new SerialPort(opts.port, {
    baudrate: opts.speed,
    databits:7,
    parity:'even'
  });

  /* minitel functions */
  // write a line to the minitel
  self.wrChars = function  (str) {
    assert(typeof str==='string');
    serialPort.write(str);
  };

  // write a line to the minitel
  self.wrLn = function (line) {
    var lnLnth  = line.length;
    var curLine ='';
    assert(typeof(line)==='string');
    assert(isNumber(lnLnth));
    // if the line is less thant 40 char
    // we fill it with white space till 40;
    if(lnLnth < 41){
      var fillCount = 40 - line.length + 1;
      var fill = Array(fillCount).join(' ');
      curLine = line+fill;
    }else{ // else we trim it to 40 char
      var sF = (lnLnth -40) *-1;
      line = line.slice(0, sF);
      curLine = line;
    }

    // check that the line is exactly 40 char long
    assert(curLine.length===40);

    // write the line to the minitel
    serialPort.write(curLine);
  };

  // clear the minitel output
  self.clear = function(){
    serialPort.write('\x0c');
  };

  self.beep = function () {
    serialPort.write('\x07'); // da noiz
  };

  // read a textfile clear the screen and send its content line by line to the minitel
  self.wrFile = function (file) {
    self.clear();
    lineReader.eachLine(file, function(line, last) {
      self.wrLn(line);
      if (last === true) {
        return false; // stop reading
      }
    });
  };

  // when the minitel serial com is open
  serialPort.on('open', function () {
    console.log('Minitel is online');
    self.clear();

    // logs input of the minitel keyboard
    serialPort.on('data', function(data) {
      self.emit('keyPress', data);
    });

    // display the default image
    self.emit('ready', 'ready');
  });

  // check if n is a number
  function isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  // TODO understand why i can't pass the emmiter AND the proto functions
  //return minitel;
}

util.inherits(Minitel, EventEmitter);

module.exports = Minitel;