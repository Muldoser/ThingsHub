'use strict';

const 	exec = require('child_process').exec;


// test commands


describe("Thingshub flag options", function(){
	it('Should return a string (for now)', function(){
		let output;
		exec('node ./thingshub -l', (err, stdout, stderr) => {
		  if (err) {
		    console.error(err);
		    return;
		  }

		  output = stdout;
		  console.log(`stderr: ${stderr}`);
		  console.log(`stdout: ${stdout}`);
		});

		expect(output).not.toBe("Attached things: None you doofus");
	});
});