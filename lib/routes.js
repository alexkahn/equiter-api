var redis = require('redis');
var client = redis.createClient();
var Joi = require('joi');

function indexHandler(request, reply) {
  reply('Hello server');
}

function symbolsListHandler (request, reply) {
  reply("Here are all the symbols");
}

function symbolDetailHandler (request, reply) {
  client.get(request.params.symbol, function(err, data) {
    reply(data);
  });
}

function companySearchHandler (request, reply) {
  var prefix = request.query.search.trim().toLowerCase();
  client.zrank('autocompl', prefix, function (err, startIndex) {
    client.zrange('autocompl', startIndex, startIndex+200, function(err, res) {
      res = res.filter(function(prefix) {
        return prefix.indexOf('*') === prefix.length - 1
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