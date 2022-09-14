const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: 'mysql',
      port: 3306,
      database: env.init('DATABASE_NAME','main'),
      username: env.init('DATABASE_USERNAME','edificios'),
      password: env.init('DATABASE_PASSWORD','edificios_password'),
  },
    useNullAsDefault: true,
  },
});
