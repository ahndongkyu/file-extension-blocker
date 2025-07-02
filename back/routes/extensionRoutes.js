const express = require('express');
const router = express.Router();
const controller = require('../controllers/extensionController');

router.get('/', controller.getAllExtensions);
router.post('/custom', controller.addCustomExtension);
router.patch('/fixed', controller.updateFixedExtensions); // ✅ 추가

module.exports = router;
