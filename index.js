var Hapi = require('hapi');
var Routes = require('./lib/routes');

var server = new Hapi.Server();

server.connection({port: 3000});

server.route(Routes);

server.register({ register: require('lout') }, function(err) {});

server.start(function() {
  console.log("Server running at: ", server.info.uri);
});
