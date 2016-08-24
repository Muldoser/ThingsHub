#! /usr/bin/env node
var program = require('commander');
var shell = require("shelljs");
var fs = require('fs');
var stringify = require('json-stringify-safe');

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
  .option('-i, --list-available-interfaces', 'List all the available interfaces');

program
  .command('attach <INTERFACE>')
  .option('-d, --dissect <DISSECTOR>', 'Specify a dissector')
  .option('-s, --silent', 'Turn silent mode on')
  .action(function(INTERFACE, options) {
    console.log('Saving configuration...');
    appendObject({name: INTERFACE, dissector: options.dissect});
  });

program.parse(process.argv);

if (program.listAttachedThings) {
  console.log('Attached things: None you doofus')
};
if (program.listAvailableInterfaces) {
  console.log('There are no available interfaces')
};
