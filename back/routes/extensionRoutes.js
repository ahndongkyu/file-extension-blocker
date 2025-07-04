const express = require('express');
const router = express.Router();
const extensionController = require('../controllers/extensionController');

// 전체 확장자 목록 조회 (고정 + 커스텀)
router.get('/', extensionController.getAllExtensions);
// 커스텀 확장자 추가
router.post('/custom', extensionController.addCustomExtension);
// 고정 확장자 체크 상태 업데이트
router.patch('/fixed', extensionController.updateFixedExtensions);
// 고정 확장자 전체 조회
router.get('/fixed', extensionController.getFixedExtensions);
// 커스텀 확장자 삭제
router.delete('/custom/:extension', extensionController.deleteCustomExtension);

module.exports = router;
