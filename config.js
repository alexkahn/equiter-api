var env = process.env.NODE_ENV || 'production';

var config = {
  development: {
    redis: {
      host: 'localhost',
      port: 6379,
      pass: ''
    },
    port: 3000
  },
  test: {},
  production: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      user: process.env.REDIS_USER,
      pass: process.env.REDIS_PASS
    },
    port: process.env.PORT
  }
};

module.exports = config[env];
