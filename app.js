var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://broker.hivemq.com:1883');
var SerialPort = require("serialport");
var port = new SerialPort("/dev/cu.usbmodem1421", {
  baudRate: 9600,
  parser: SerialPort.parsers.readline(",")
});

//Open serial port and immediately publish datastream to topic
port.on('open', function(){
  console.log('Serial Port Opened');
    client.on('connect', function () {
      port.on('data', function(data){
      client.subscribe('presence');
      client.publish('presence', data);
    });
  });
});

//Subscribe to same topic and log datastream in string format
client.on('message', function (topic, message) {
  console.log(message.toString());
  //Client.end removed so connection isnt closed
});
