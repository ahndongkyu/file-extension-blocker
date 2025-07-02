const express = require('express');
const cors = require('cors');
// require('dotenv').config({ path: '../.env' }); // 루트 디렉토리의 .env 파일 로드
require('dotenv').config(); // ✅ 경로 지정 없이 기본 사용

const extensionRouter = require('./routes/extensionRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// CORS 허용 및 JSON 파싱 미들웨어 설정
app.use(cors());
app.use(express.json());

// 확장자 관련 라우터 등록
app.use('/extensions', extensionRouter);

// 기본 루트 라우터
app.get('/', (req, res) => {
  res.send('서버 정상 작동 중');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버 실행됨: http://localhost:${PORT}`);
});
