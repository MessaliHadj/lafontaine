const express = require('express');
const signupCtrl = require('../controllers/signupCtrl');
const router = express.Router();

router.put('', signupCtrl.setNewUser);

module.exports = router;