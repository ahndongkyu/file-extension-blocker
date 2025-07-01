const express = require('express');
const router = express.Router();
const extensionController = require('../controllers/extensionController');

router.get('/', extensionController.getAllExtensions);

module.exports = router;
