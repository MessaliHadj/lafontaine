const express = require('express');
const authCtrl = require('../controllers/authCtrl');
const permissionMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('', authCtrl.getAuth);
router.post('/refresh/:id', permissionMiddleware.checkRefresh, authCtrl.getNewAccessToken);

module.exports = router;