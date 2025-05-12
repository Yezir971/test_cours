const express = require('express');
const router = express.Router();
const userCtrl = require('../src/users');
const list = require('../src/listeUser.js');

router.post('/create/user', userCtrl.create);
router.get('/users', list.listUsers);

module.exports = router;