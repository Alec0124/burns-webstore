// build and export your unconnected client here

const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/burns_webstore');

module.exports = {
    client
};