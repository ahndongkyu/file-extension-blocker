// const db = require('./db'); 연결 테스트용

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const extensionRouter = require('./routes/extensionRoutes');

const app = express(); // ⬅️ 이게 반드시 먼저 나와야 함
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// 📌 이 아래에 라우터 등록
app.use('/extensions', extensionRouter);

app.get('/', (req, res) => {
  res.send('✅ 서버 정상 작동 중');
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행됨 → http://localhost:${PORT}`);
});
