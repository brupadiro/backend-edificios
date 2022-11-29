const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('POSTGRES_HOST'),
      port: 5432,
      database: env('POSTGRES_DB'),
      user: env('POSTGRES_USER'),
      password: env('POSTGRES_PASSWORD'),
  },
    useNullAsDefault: true,
  },
});
