#! /usr/bin/env node
var 	program = require('commander'),
		shell = require("shelljs"),
		SerialPort = require('serialport');

program
  .version('0.0.1')
  .option('-l, --list-attached-things', 'List all the attached things')
  .option('-L, --list-available-interfaces', 'List all the available interfaces');

program
  .command('attach')
  .action(function() {
    console.log('testing attachment');
  });

program.parse(process.argv);

if (program.listAttachedThings) {
  console.log('Attached things: None you doofus')
};
if (program.listAvailableInterfaces) {

  SerialPort.list(function(err, ports){

    if(err){
      console.log('An error occurred while looking fore available interfaces: ' + err);
      return null;
    }
  	if(ports.length > 0){
      console.log('All ports: ' + JSON.stringify(ports));
      ports.forEach(function(port){
        console.log(port.comName);
        console.log(port.manufacturer);
      });
    }
    else{
      console.log('There are no available interfaces');      
    }
  });

};
