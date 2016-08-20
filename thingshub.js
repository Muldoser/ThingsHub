#! /usr/bin/env node
var program = require('commander');
var shell = require("shelljs");

program
  .version('0.0.1')
  .option('-l, --list-attached-things', 'List all the attached things')
  .option('-i, --list-available-interfaces', 'List all the available interfaces');

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
  console.log('There are no available interfaces')
};
