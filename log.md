# Log


#### feature/init-testing
* `npm i ... -S` is the same as `npm install ... --save`
* `npm i ... -D` is the same as `npm install ... --save-dev`
* `npm i shelljs -S` for windows/osx/linux compatibility in use of commands
* `npm i commander -S` for creating commands
* `npm i jasmine -D` for unit testing
* `jasmine init` to initialize jasmine project (startup tests). This creates the specs folder with a configure file for jasmine: 'jasmine.json'.
* Following code checks if the command 'thingshub -l' works and returns it's temporary default response. ("Attached things: None you doofus" as there are no attached interfaces yet) 


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

* exec()