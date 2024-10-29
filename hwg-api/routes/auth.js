const express = require('express');
const authCtrl = require('../controllers/authCtrl');

const router = express.Router();

router.post('', authCtrl.getAuth);

module.exports = router;