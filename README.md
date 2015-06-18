# minitel
low teck, node powered, it needed to be done 

this module allow you to connect to a minitel, a terminal for an obsolete pre internet version of a country wide (France) intranet.

this it allow you to get key pressed from the keyboard and write to the terminal from node, or display content of a textfile. 

this module is currently in an experimental stage and i need to discover and implement more features.

## Install
```npm install minitel --save```

## usage 

- hook up your minitel via a serial cable or an arduino like thing
- instantiate a new minitel setting up the port accordingly.
- power up the minitel 


```
var Minitel = require('minitel');
var minitel = new Minitel({
  port:'/dev/tty.usbserial-A9M5DF7B', // your path will be different 
  speed:4800 // minitel defaults to 1200
});

// event fired when the module open the serial communication to the minitel 
// do NOT call any minitel method before it is fired 
minitel.on('ready', function () {
  minitel.readMsg('ascii/j5.txt');
});
```

## API 

### wrChars
```minitel.wrChars('yo');```  

writes char to the minitel 

### wrLn
```minitel.wrLn('I'm writing a line here');```  

writes a full line to the minitel by concatenating the string and fill the remaining char to 40 char (full line) with space if the line is more than 40 lines the rest is not displayed

### wrFile
```minitel.wrFile('pathTo/file.txt')```  
clear the minitel output and read the selected file, displaying it line by line using wrLn func.

### beep
```minitel.beep()```  
make some NOIZE

### clear
```minitel.clear()```  
clear the minitel output

## notes

- currently line longer that 40 char will be spliced the rest goes to the sharks.
- on the minitel keyboard Fct-P then 4 to set speed to 4800 bauds and set up the speed option to 4800 to have a better frame rate 

resolution : teletext 40 * 24 char 


## change log 

1.0.0 : basic version
1.1.0 : basic api, events for established serial connection

## TODO 

- multiline support (create proper line for the wrLn func)
- put asserts in proper tests
- repl for interactive terminal
- stream support
- npm module 
- better doc
