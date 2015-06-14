# minitel
low teck, node powered, it needed to be done 

for the moment just a test thing.

- hook up your minitel via a seria cable or an ardino like thing
- edit mintel.js with the path to your serial port. (conf.port)
- edit the text file you want to display (conf.txtFile)
- power up the minitel 
- on the mintel keyboard Fct-P then 4 to set speed to 4800 bauds. (or set conf.speed)
- node minitel.js 

# notes

currently line longer that 40 char will be spliced the rest goes to the sharks.

resolution : teletext 40 * 24 char 

# TODO 

- put asserts in tests
- repl
- npm module 
- doc
