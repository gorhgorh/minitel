var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/cu.usbserial-A9M5DF7B", {
  // baudrate: 1200,
  baudrate: 4800,
  databits:7,
  parity:'even'
});
var fs = require('fs');
var message = fs.readFile('./message.txt','utf8', function (err, data) {
  if (err) throw err;
  console.log("done");
});

var lineReader = require('line-reader');



var readMsg = function (file) {
  lineReader.eachLine(file, function(line, last) {
    //line = line.replace(/\r?\n|\r/g, " ");
    console.log(line);
    writeLine(line);
    if (last === true) {
      return false; // stop reading
    }
  });
  // body...
};

serialPort.on("open", function () {
  console.log('open');
  //clearInterval(interval);
  //writeLine("lala");
  serialPort.write("\x0c"); // clearScreen
  readMsg('samples/j5.txt');//
  // serialPort.write("\x07"); // da noiz
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
    // writeLine("012345678911234567892123456789312345678");


    // serialPort.write(" ## ### ###      ##  #  ### ### ### ### \n");
    // serialPort.write(" #  ##  #    #  # #  #  # # # # #    #  \n");
    // serialPort.write("##  ### #    ## ###  ## ### ### #    ## \n");
    // serialPort.write("                        #              \n");
    // serialPort.write("\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D#-AT-#\n");
    // serialPort.write("\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D#-CG-#\n");
    // serialPort.write("\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D#-TA-#\n");
    // serialPort.write("\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D#-AT-#\n");
    // serialPort.write("\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D#-GC-#\n");
    // serialPort.write("\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D####\n");
  // serialPort.write("ls\n", function(err, results) {
  //   console.log('err ' + err);
  //   console.log('results ' + results);
  // });
});

var writeLine = function  (line) {
  var curline ='';
  var fillCount = 40 - line.length + 1;
  var fill = Array(fillCount).join(" ");
  console.log(line.length, fillCount, fill);
  curLine = "\x1b[D\x1b[D\x1b[D\x1b[D\x1b[D"+line+fill;
  serialPort.write(curLine);
};