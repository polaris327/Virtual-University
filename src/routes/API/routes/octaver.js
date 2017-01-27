const path = require('path');
const Q = require('q');
const fs = require('fs');
const exec = require('child-process-promise').exec;

// Returns a promise when writing to our temp file
const writeToFile = input => Q.Promise((resolve, reject) => {
  fs.writeFile(path.join(__dirname, '../../OCTAVE/user-code.m'), input, (err) => {
    if (err) {
      return reject(err);
    }
    return resolve('Success');
  });
});


module.exports = (app) => {
  app.post('/API/POST/octave', (req, res) => {
    const code = req.body.code;

    console.log(`Body: ${JSON.stringify(req.body)}`);

    writeToFile(code).then((result) => {
      if (result === 'Success') {
        exec(`octave -q ${path.join(__dirname, '../../OCTAVE/pizza.m')}`).then((results) => {
          console.log('success!');
          const stdout = results.stdout;
          const stderr = results.stderr;
          const workspace = fs.readFileSync(path.join(__dirname, '../../OCTAVE/jsondata'), 'utf-8');

          console.log(stdout);
          console.log(stderr);
          console.log(workspace);
          res.json({
            stdout,
            stderr,
            workspace,
          });
        }).fail((err) => {
          console.log('fail!');
          const type = err.message.split('error', 3)[0];

          const Command = type.split(':')[1];

          const msg = err.message.split('error', 3);
          console.log(err.message);

          if (Command.trim() === 'parse') {
            if (msg[2].trim() === '') {
              res.json({
                error: msg[0].trim(),
              });
            } else {
              res.json({
                error: `${msg[0].split(':')[0]} ${msg[2]}`,
              });
            }
          } else {
            res.json({
              error: `${msg[0]} ${msg[1].split(':')[1]}`,
            });
          }
        }).done(() => {
          console.log('Done!');
          writeToFile('').then((results) => {
            if (results === 'Success') {
              console.log('Deleted user-code.m contents');
            }
          });
        });
      }
      return result;
    }).catch((err) => {
      res.json({ error: err.message });
    }).done();
  });
};
