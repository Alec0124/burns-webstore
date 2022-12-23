// build and export your unconnected client here

const { Client } = require('pg');
// const DB_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/burns_webstore';
const client = new Client({
    host: '35.245.212.150',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
  })

module.exports = {
    client
};