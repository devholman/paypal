const express = require('express');
const { getTime } = require('./utils');
const app = express();

const EMAIL_PATTERN =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

//only capital or lowercase alphabet letters
const NAME_PATTERN = /^[a-zA-Z]+$/;

//8-20 characters long; rejects "password" substring ; no spaces; letters, numbers, special chars allowed;
const PASSWORD_PATTERN = /^(?!^password$)[a-zA-Z0-9!#$%&?]{8,20}$/;

//example payload
// const user = {
//   email: 'd@p.com',
//   password: 'password',
//   name: 'devyn',
// };

//MIDDLEWARES
const loggingMiddleware = (req, res, next) => {
  //logs Current_time, http_method, endpoint, request_id
  const currentTime = getTime();
  console.log(`${currentTime} ${req.method} ${req.url} ${req.headers.req_id}`);
  next();
};
const validationMiddleware = (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password || !user.name) {
    return res.status(400).json({
      err: { reason: 'Missing required data' },
    });
  }
  if (
    !EMAIL_PATTERN.test(user.email) ||
    !PASSWORD_PATTERN.test(user.password) ||
    !NAME_PATTERN.test(user.name)
  ) {
    return res.status(400).json({
      error: 'invalid request payload',
    });
  }
  next();
};

//middlewares for all endpoints
app.use(express.json(), loggingMiddleware);

//middlewares for specific endpoints
app.use('/signup', validationMiddleware);

app.get('/user/:id', (req, res, next) => {
  res.send('User info');
});

app.post('/signup', (req, res, next) => {
  res.status(200).json({
    id: 678, //unsure what this ID should be after reading assignment instructions
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});

module.exports = app;
