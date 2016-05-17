var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    env: env,
    port: 3000,
    db: 'mongodb://127.0.0.1/chat-webservice-development',
    secret: 'fcyheIBdgWhIiuhcZ1GaSmd2YZF9MyNHgnHt1Las1WET4x8VlUTgkPShArwT'
  },

  production: {
    env: env,
    port: process.env.PORT,
    db: process.env.MONGODB_URI,
    secret: process.env.SECRET
  }
};

module.exports = config[env];
