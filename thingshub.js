#! /usr/bin/env node
var program = require('commander');
var shell = require("shelljs");
var fs = require('fs');
var stringify = require('json-stringify-safe');
var SerialPort = require("serialport");

function appendObject(obj){
  var configFile = fs.readFileSync('./data.json');
  var config = JSON.parse(configFile);
  config.push(obj);
  var configJSON = stringify(config);
  fs.writeFileSync('./data.json', configJSON);
}

program
  .version('0.0.1')
  .option('-l, --list-attached-things', 'List all the attached things')
  .option('-L, --list-available-interfaces', 'List all the available interfaces');

program
  .command('attach <INTERFACE>')
  .option('-d, --dissect <DISSECTOR>', 'Specify a dissector')
  .option('-s, --silent', 'Turn silent mode on')
  .action(function(INTERFACE, options) {
    var silence = false;
    console.log('Saving configuration...');
    if (options.silent)
      {
        silence = true;
      }
    appendObject({name: INTERFACE, dissector: options.dissect, silent: silence});
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
