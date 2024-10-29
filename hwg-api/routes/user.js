// const express = require('express')
// const { Op } = require("sequelize");
// const User = require('../models/user')

// let router = express.Router()

// router.get('', (req, res)=> {
//   User.findAll({attributes: { exclude: ['password'] }, raw: true})
//     .then( users => res.json({data: users}) )
//     .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
// })

// router.get('/:id', (req, res)=> {
//   let userId = parseInt(req.params.id)

//   if(!userId) return res.status(400).json({ message: 'Missing paramater' })

//   User.findOne({ where: {id: userId}, attributes: { exclude: ['password'] }, raw: true })
//     .then( user => {
//       return !user ? res.status(404).json({ message: 'This user does not exist !' }) : res.json({ data: user }) 
//     })
//     .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
// })

// router.put('', async (req, res) => {
//   const { lastname, firstname, email, phone_number, password } = req.body;
//   if (!lastname || !firstname || !email || !phone_number || !password) {
//     return res.status(400).json({ message: 'Missing data' });
//   }

//   const newUser = { lastname, firstname, email, phone_number, password };
//   try {
//     const user = await User.findOne({ where: { [Op.or]: [{ email }, { phone_number }] } });
//     if (user) return res.status(400).json({ message: 'This email or phone number already exists' })

//     const createdUser = await User.create(newUser);
//     res.json({ message: 'User successfully created', data: createdUser })
//   } catch (err) {
//     res.status(500).json({ message: 'Database Error', error: err });
//   }
// });

// router.patch('/:id', async (req, res) => {
//   const userId = parseInt(req.params.id);

//   if (!userId) return res.status(400).json({ message: 'Missing parameter' });

//   try {
//     const user = await User.findOne({ where: { id: userId } });
//     if (!user) return res.status(404).json({ message: 'This user does not exist!' });

//     await User.update(req.body, { where: { id: userId } });

//     const updatedUser = await User.findOne({ where: { id: userId }, raw: true });

//     res.json({ message: 'User successfully updated', data: updatedUser });
//   } catch (err) {
//     res.status(500).json({ message: 'Database Error', error: err });
//   }
// });


// router.post('/untrash/:id', (req, res)=> {
//   let userId = parseInt(req.params.id)

//   if(!userId) return res.status(400).json({ message: 'Missing paramater' })

//   User.restore({ where: {id: userId} })
//     .then( user => {
//       return !user ? res.status(404).json({ message: 'This user does not exist !' }) : 
//       res.status(204).json({}) 
//     })
//     .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
// })

// router.delete('/trash/:id', (req, res)=> {
//   let userId = parseInt(req.params.id)

//   if(!userId) return res.status(400).json({ message: 'Missing paramater' })

//   User.destroy({ where: {id: userId} })
//     .then( user => {
//       return !user ? res.status(404).json({ message: 'This user does not exist !' }) : 
//       res.status(204).json({}) 
//     })
//     .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
// })

// router.delete('/:id', (req, res)=> {
//   let userId = parseInt(req.params.id)

//   if(!userId) return res.status(400).json({ message: 'Missing paramater' })

//   User.destroy({ where: {id: userId}, force: true })
//     .then( user => {
//       return !user ? res.status(404).json({ message: 'This user does not exist !' }) : 
//       res.status(204).json({}) 
//     })
//     .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
// })

// module.exports = router
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

router.post('/untrash/:id', permissionMiddleware.checkRequest, userCtrl.restoreUser);

router.delete('/trash/:id', permissionMiddleware.checkRequest, userCtrl.softDeleteUser);

router.delete('/:id', permissionMiddleware.checkRequest, userCtrl.hardDeleteUser);

module.exports = router;