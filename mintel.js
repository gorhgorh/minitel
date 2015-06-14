/**
 * Node MINITEL or why use expensive lcd screens ?
 */

var conf        = {};
conf.port       = '/dev/cu.usbserial-A9M5DF7B';
conf.speed      = 4800;
conf.txtFile    = 'ascii/test.txt';

var lineReader  = require('line-reader');
var SerialPort  = require('serialport').SerialPort;
var assert      = require('assert');

var minitel = {};

// serial port init
var serialPort = new SerialPort(conf.port, {
  baudrate: conf.speed,
  databits:7,
  parity:'even'
});

// check if n is a number
var isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


/* minitel functions */

// write a line to the minitel
minitel.wrLn = function (line) {
  var lnLnth  = line.length;
  var curline ='';

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
minitel.clear = function(){
  serialPort.write('\x0c');
};

minitel.beep = function () {
  serialPort.write('\x07'); // da noiz
};

// read a textfile and send its content line by line to the minitel
var readMsg = function (file) {
  minitel.clear();
  lineReader.eachLine(file, function(line, last) {
    minitel.wrLn(line);
    if (last === true) {
      console.log('file read');
      return false; // stop reading
    }
  });
};

// when the minitel is there
serialPort.on('open', function () {
  console.log('Minitel is available');
  drawFrame();

  // logs input of the minitel keyboard
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
});

function drawFrame() {
  readMsg(conf.txtFile);
}