var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://broker.hivemq.com:1883');
 
client.subscribe('presence');
 
client.on('message', function(topic, message) {
  console.log(message.toString());
});
