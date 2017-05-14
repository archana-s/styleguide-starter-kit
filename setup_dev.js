#!/usr/bin/env node

const npm = require('npm')

npm.load(err => {
  // Install necessary modules to set up styleguide
  npm.commands.install(['recursive-copy', 'readline', 'fs'], (err, data) => {
    if (err) {
      throw err;
    }

    const copy = require('recursive-copy')
    const rl = require('readline')
    const fs = require('fs')

    // Create a directory one level above fragmos
    const styleguideExists = fs.existsSync('./styleguide');

    if (styleguideExists) {
      console.log('styleguide folder exists. Please rename it and try again.')
    }

    if (!styleguideExists) {
      const i = rl.createInterface(process.stdin, process.stdout, null)

      // Ask the user for project name and logo location
      i.question("What is the name of your project? ", projectName => {
        i.question("Provide a local full path to your logo file (You can also leave it at default for now): ", logoLocation => {

          // Create the project Styleguide directory
          fs.mkdir('./styleguide', function(data) {
            copy('/usr/local/lib/node_modules/fragmos/src', './styleguide/src', function(err, results) {
              if (err) {
                throw err;
              }

              // Add package.json and index.js files
              fs.createReadStream('/usr/local/lib/node_modules/fragmos/package.json.toCopy').pipe(fs.createWriteStream('./styleguide/package.json'));
              fs.createReadStream('/usr/local/lib/node_modules/fragmos/index.js').pipe(fs.createWriteStream('./styleguide/index.js'));

              // Include the project name in gulpfile
              let gulpFileData = fs.readFileSync('/usr/local/lib/node_modules/fragmos/gulpfile.js', 'utf-8')
              gulpFileData = gulpFileData.replace('%%project%%', projectName)
              try {
                fs.writeFileSync('./styleguide/gulpfile.js', gulpFileData)
              } catch(err) {
                throw err;
              }

              copy('/usr/local/lib/node_modules/fragmos/public', './styleguide/public', function(err, data) {
                if (err) throw err;
                if (logoLocation && fs.existsSync(logoLocation)) {
                  fs.createReadStream(logoLocation).pipe(fs.createWriteStream('./styleguide/public/images/logo.png'))
                } else {
                  console.log('Could not find the logo file at ', logoLocation,  '. Default icon will be included now.')
                }
                console.log('You generated styleguide + all styles are available in styleguide dir')
                i.close()
              })
            })
          })
        })
      })
    }
  })
  npm.on('log', message => {
    console.log(message)
  })
})
