#!/usr/bin/env node
'use strict';

var exec = require('child_process').exec;

var cmd = 'sudo npm install -g recursive-copy readline-sync fs';
exec(cmd, function (error, stdout, stderr) {
  if (error) {
    console.log(error);
  }

  var copy = require('recursive-copy');
  var i = require('readline-sync');
  var fs = require('fs');

  // Create a directory one level above styleguide-starter-kit
  var styleguideExists = fs.existsSync('./styleguide');

  if (styleguideExists) {
    console.log('styleguide folder exists. Please rename it and try again.');
  } else {
    var projectName = i.question('Please provide the name of your app : ');
    var logoLocation = i.question('Please provide path to your logo if you have it : ');

    fs.mkdir('./styleguide', function (data) {
      copy('/usr/local/lib/node_modules/styleguide-starter-kit/styleguide', './styleguide/', function (err, results) {
        if (err) {
          throw err;
        }

        // Include the project name in gulpfile
        var gulpFileData = fs.readFileSync('./styleguide/gulpfile.js', 'utf-8');
        gulpFileData = gulpFileData.replace('%%project%%', projectName);
        try {
          fs.writeFileSync('./styleguide/gulpfile.js', gulpFileData);
        } catch (err) {
          throw err;
        }

        if (logoLocation && fs.existsSync(logoLocation)) {
          fs.createReadStream(logoLocation).pipe(fs.createWriteStream('./styleguide/public/images/logo.png'));
        } else {
          console.log('Could not find the logo file at ', logoLocation, '. Default icon will be included now.');
        }

        console.log('Building all your styleguide assets');
        console.log('-----------------------------------');
        var childProcess = exec('cd styleguide; npm run build', function (error, stdout, stderr) {
          if (error) {
            console.log('Error while trying to set up styleguide ' + error + ' ' + stdout + ' ' + stderr);
          }
          console.log('You generated styleguide + all styles are available in styleguide dir');
        });

        childProcess.stdout.on('data', function (data) {
          console.log(data.toString());
        });
      });
    });
  }
});
