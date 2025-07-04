const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL 연결 풀 생성
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Render DB 사용 시 필요
  },
});

// DB 연결 확인
pool
  .connect()
  .then(() => console.log('PostgreSQL 연결 성공'))
  .catch((err) => console.error('PostgreSQL 연결 실패:', err));

module.exports = pool;
