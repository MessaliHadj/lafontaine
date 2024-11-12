const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const permissionMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('', permissionMiddleware.checkRoles, userCtrl.getAllUsers);

router.get('/trash', permissionMiddleware.checkRoles, userCtrl.getAllUsersWithDeleted)

router.get('/:id', permissionMiddleware.checkRequest, userCtrl.getUserById);

router.get('/trash/:id', permissionMiddleware.checkRequest, userCtrl.getUserDeletedById);

router.get('/search', permissionMiddleware.checkRequest, userCtrl.getUserByEmailOrPhone);

router.patch('/:id', permissionMiddleware.checkRequest, userCtrl.updateUser);

router.patch('/role/:id', permissionMiddleware.checkRoles, userCtrl.updateRoleUser);

router.post('/untrash/:id', permissionMiddleware.checkRequest, userCtrl.restoreUser);

router.delete('/trash/:id', permissionMiddleware.checkRequest, userCtrl.softDeleteUser);

router.delete('/:id', permissionMiddleware.checkRequest, userCtrl.hardDeleteUser);

module.exports = router;