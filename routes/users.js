const express = require('express');
const router = express.Router();
const userCtrl = require('../src/users');

router.post('/api/create/user', userCtrl.create);

module.exports = router;