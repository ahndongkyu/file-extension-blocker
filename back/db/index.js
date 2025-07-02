const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' }); // 루트의 .env 파일에서 DB 환경 변수 로드

// PostgreSQL 연결 풀 생성
const pool = new Pool({
  host: process.env.DB_HOST, // DB 호스트 주소
  port: process.env.DB_PORT, // DB 포트
  user: process.env.DB_USER, // DB 사용자 이름
  password: process.env.DB_PASSWORD, // DB 비밀번호
  database: process.env.DB_NAME, // 사용 DB 이름
});

// DB 연결 확인
pool
  .connect()
  .then(() => console.log('PostgreSQL 연결 성공'))
  .catch((err) => console.error('PostgreSQL 연결 실패:', err));

module.exports = pool;
