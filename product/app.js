var deployd = require('deployd');

var server = deployd({
  port: process.env.PORT || 8080,
  env: 'production',
  db: {
    host: 'localhost',
    port: 27017,
    name: 'diary',
  }
   /*

  env: 'production',
  db: {
    host: 'widmore.mongohq.com',
    port: 10000,
    name: 'mdiary',
    credentials: {
        username: 'admin',
        password: 'md2013'
      }
  }
   */
  }
);


server.listen();
server.on('listening', function() {
  console.log("diary server is listening 8080");

});

server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});