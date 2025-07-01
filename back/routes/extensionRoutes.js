const express = require('express');
const router = express.Router();
const controller = require('../controllers/extensionController');

router.get('/', controller.getAllExtensions);
router.post('/custom', controller.addCustomExtension);

module.exports = router;
