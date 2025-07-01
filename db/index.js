const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then(() => console.log('✅ PostgreSQL 연결 성공'))
  .catch((err) => console.error('❌ PostgreSQL 연결 실패:', err));

module.exports = pool;
