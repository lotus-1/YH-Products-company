const bcrypt = require('bcryptjs');
const qs = require('querystring');

const login = (req, res) => {
  var body = '';
  req.on('data', (data) => {
    body += data.toString();
  });
  req.on('end', () => {
    const { email, password } = qs.parse(body)
    queries.get(email, (err, passwordInDb) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error logging in...')
      }
      if (!passwordInDb) {
        res.statusCode = 403;
        res.end('Oooooooppppppsssss, no details match that user');
      }
      bcrypt.compare(password, passwordInDb, (err, passwordMatch) => {
        if (err) {
          res.statusCode = 500;
          res.end('<h1>ERROR</h1>');
        } else if (!passwordMatch) {
          res.statusCode = 403;
          res.end('Password doesn\'t match the username');
        }
        res.statusCode = 200;
        res.end('Welcome to the club!')
      });
    })
  })
}
