const express = require('express');
const router = express.Router();
const extensionController = require('../controllers/extensionController');

router.get('/', extensionController.getAllExtensions);
router.post('/custom', extensionController.addCustomExtension);
router.patch('/fixed', extensionController.updateFixedExtensions);
router.get('/fixed', extensionController.getFixedExtensions);
router.delete('/custom/:extension', extensionController.deleteCustomExtension);

module.exports = router;
