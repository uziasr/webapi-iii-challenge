const express = require('express');
const server = express();
const postRouter = require('./posts/postRouter')

server.get('', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// custom middleware

function logger(req, res, next) {
  console.log( new Date().toISOString())
    console.log('HTTP METHOD: ',req.method,' URL: ',req.originalUrl)
    next();

};
server.use(logger)
server.use('/', postRouter)



module.exports = server;
