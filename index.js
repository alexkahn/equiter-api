var Hapi = require('hapi')
  , Good = require('good')
  , Inert = require('inert')
  , Routes = require('./lib/routes')
  , config = require('./config')
  , server = new Hapi.Server()
  ;

server.connection({
  port: config.port,
  routes: { cors: true }
});

server.route(Routes);

server.register(Inert, function () {});

server.register(require('vision'), (err) => {
  if (err) {
    server.log('error', "Failed to load vision.");
  }
});

server.register({ register: require('lout') }, function(err) {
  if (err) {
    throw err;
  }
});

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        reponse: '*',
        log: '*'
      }
    }]
  }
}, function (err) {
  if (err) {
    throw err;
  }
  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});

