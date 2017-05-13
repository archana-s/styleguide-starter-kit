#!/usr/bin/env node
'use strict';

var npm = require('npm');

npm.load(function (err) {
  // Install necessary modules to set up styleguide
  npm.commands.install(['recursive-copy', 'readline', 'fs'], function (err, data) {
    if (err) {
      throw err;
    }

    var copy = require('recursive-copy');
    var rl = require('readline');
    var fs = require('fs');

    // Create a directory one level above fragmos
    var styleguideExists = fs.existsSync('./styleguide');

    var styleguideDir = './styleguide';
    if (styleguideExists) {
      console.log('styleguide folder exists. Would you like to provide a different name? What name would you like for the folder?.');
    }

    if (!styleguideExists) {
      (function () {
        var i = rl.createInterface(process.stdin, process.stdout, null);

        // Ask the user for project name and logo location
        i.question("What is the name of your project? ", function (projectName) {
          i.question("Provide a local full path to your logo file (You can also leave it at default for now): ", function (logoLocation) {

            // Create the project Styleguide directory
            fs.mkdir('./styleguide', function (data) {
              copy('/usr/local/lib/node_modules/fragmos/styleguide_material/src', './styleguide/src', function (err, results) {
                if (err) {
                  throw err;
                }

                // Add package.json and index.js files
                fs.createReadStream('/usr/local/lib/node_modules/fragmos/styleguide_material/package.json').pipe(fs.createWriteStream('./styleguide/package.json'));
                fs.createReadStream('/usr/local/lib/node_modules/fragmos/styleguide_material/index.js').pipe(fs.createWriteStream('./styleguide/index.js'));

                // Include the project name in gulpfile
                var gulpFileData = fs.readFileSync('/usr/local/lib/node_modules/fragmos/styleguide_material/gulpfile.js', 'utf-8');
                gulpFileData = gulpFileData.replace('%%project%%', projectName);
                try {
                  fs.writeFileSync('./styleguide/gulpfile.js', gulpFileData);
                } catch (err) {
                  throw err;
                }

                copy('/usr/local/lib/node_modules/fragmos/styleguide_material/public', './styleguide/public', function (err, data) {
                  if (err) throw err;
                  if (logoLocation && fs.existsSync(logoLocation)) {
                    fs.createReadStream(logoLocation).pipe(fs.createWriteStream('./styleguide/public/images/logo.png'));
                  } else {
                    console.log('Could not find the logo file at ', logoLocation, '. Default icon will be included now.');
                  }
                  console.log('You generated styleguide + all styles are available in styleguide dir');
                  i.close();
                });
              });
            });
          });
        });
      })();
    }
  });
  npm.on('log', function (message) {
    console.log(message);
  });
});
