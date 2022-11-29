const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: '128.199.36.43',
      port: env('POSTGRES_PORT'),
      database: env('POSTGRES_DB'),
      user: env('POSTGRES_USER'),
      password: env('POSTGRES_PASSWORD'),
  },
    useNullAsDefault: true,
  },
});
