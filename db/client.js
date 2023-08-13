// build and export your unconnected client here

const { Client } = require('pg');
// const DB_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/burns_webstore';
const DB_NAME = "burns_webstore";
const DB_HOST = "localhost";
const DB_USER = "postgres";
const DB_PASSWORD = "postgres";
const DB_PORT = 5432;

const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  })

module.exports = {
    client
};