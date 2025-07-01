const express = require('express');
const cors = require('cors');
require('dotenv').config();

const extensionRouter = require('./routes/extensionRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// 라우터 등록
app.use('/extensions', extensionRouter);

app.get('/', (req, res) => {
  res.send('✅ 서버 정상 작동 중');
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행됨 → http://localhost:${PORT}`);
});
