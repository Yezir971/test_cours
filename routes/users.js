const express = require('express');
const router = express.Router();
const userCtrl = require('../src/users');

router.post('/create/user', userCtrl.create);

module.exports = router;