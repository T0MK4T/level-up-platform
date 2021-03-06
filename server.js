'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const { router: studentRouter} = require('./students');
const { router: courseRouter } = require('./courses');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: cartRouter } = require('./cart');

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config/config');

const app = express();

//Logging
app.use(morgan('common'));

//CORS
passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', {session: false});

app.use(express.static('./public'));
app.use('/student',studentRouter);
app.use('/auth',authRouter);
app.use('/course',jwtAuth,courseRouter);
app.use('/cart',jwtAuth,cartRouter);



app.use(function (req, res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  if (req.method == 'OPTIONS'){
    return res.send(204);
  }
  next();
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };