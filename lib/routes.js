var redis = require('redis');
var config = require('../config');
var client = redis.createClient(config.redis.port, config.redis.host, {auth_pass: config.redis.pass});
var Joi = require('joi');

function indexHandler(request, reply) {
  reply('Hello server');
}

function symbolsListHandler (request, reply) {
  client.get('symbols', function(err, data) {
    if (err) {
      throw err;
    }
    reply(data);
  });
}

function symbolDetailHandler (request, reply) {
  client.get(request.params.symbol, function(err, data) {
    reply(data);
  });
}

function companySearchHandler (request, reply) {
  if (request.query.search === undefined) {
    return reply({"statusCode": 400, "message": "No search parameter found"});
  }
  var prefix = request.query.search.trim().toLowerCase();
  client.zrank('autocompl', prefix, function (err, startIndex) {
    client.zrange('autocompl', startIndex, startIndex+200, function(err, res) {
      res = res.filter(function(prefix) {
        return prefix.indexOf('*') === prefix.length - 1;
      });
      reply(res);
    });
  });
}

module.exports = [
  { path: '/', method: 'GET', handler: indexHandler},
  { path: '/symbols', method: 'GET', handler: symbolsListHandler },
  {
    path: '/symbols/{symbol}',
    method: 'GET',
    handler: symbolDetailHandler,
    config: {
      validate: {
        params: {
          symbol: Joi.string()
        }
      }
    }
  },
  {
    path: '/companies',
    method: 'GET',
    handler: companySearchHandler,
    config: {
      validate: {
        query: {
          search: Joi.string()
        }
      }
    }
  }
]
