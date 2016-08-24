#! /usr/bin/env node
var program = require('commander');
var shell = require('shelljs');
var fs = require('fs');
var stringify = require('json-stringify-safe');
var SerialPort = require('serialport');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker.hivemq.com:1883');


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
    var comName = [];
    var PORT;

// If flag -s is used
    console.log('Saving configuration...');
    if (options.silent)
    {
      silence = true;
    }


// First check if ports are available
// Then compare to specified port from command (INTERFACE)
// If specified port is available, open serial port and start receiving data
    SerialPort.list(function(err, ports){
      
      // Loop through various ports
      ports.forEach(function(port){
        if (port.comName == INTERFACE){
          PORT = new SerialPort(INTERFACE, {
            baudRate: 9600,
            parser: SerialPort.parsers.readline(",")
          });
          PORT.on('open', function(){
            console.log("Receiving data from serial interface: " + INTERFACE);
            console.log("Hit 'CTRL+C' to quit...");
            PORT.on('data', function(data){
              if(!silence){
                console.log(data);
              }
            });
          });
        }

        // TODO open MQTT if no serial ports available
       else {
          client.subscribe(INTERFACE);
          client.on('message', function(topic, message) {
              console.log('MQTT: ' + message.toString());
          });
        }
      });
    });

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
      // console.log('All ports: ' + JSON.stringify(ports));
      ports.forEach(function(port){
        console.log("\nSerial port information: ")
        console.log("\t * Port name: \t\t" + port.comName);
        console.log("\t * Port manufacturer: \t" + port.manufacturer);
        console.log("\n")
      });
    }
    else{
      console.log('There are no available interfaces');
    }
  });
};
