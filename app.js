var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');
var SerialPort = require("serialport");
var port = new SerialPort("/dev/cu.usbmodem1421", {
  baudRate: 9600
});

 // subscribe
client.on('connect', function () {
  client.subscribe('presence');
  port.on('open', function(){
    console.log('Serial Port Opend');
    port.on('data', function(data){
        client.publish('presence', data);
    });
  });
});

 // verify subscription
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
