process.loadEnvFile('.env')

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    host: '127.0.0.1',
    port: 15432,
    dialect: 'postgres',
  },
}
