// build and export your unconnected client here

const { Client } = require('pg');
// const DB_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/burns_webstore';
const DB_URL = '35.245.212.150';
const client = new Client(DB_URL);

module.exports = {
    client
};