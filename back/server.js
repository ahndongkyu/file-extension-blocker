const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' }); // 루트의 .env 불러오기

const extensionRouter = require('./routes/extensionRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/extensions', extensionRouter);

app.get('/', (req, res) => {
  res.send('✅ 서버 정상 작동 중');
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행됨 → http://localhost:${PORT}`);
});
