var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');
 

 // subscribe
client.on('connect', function () {
  client.subscribe('presence');
  client.publish('presence', 'Publish victory!');
});
 
 // verify subscription
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  console.log(topic);
  client.end();
});