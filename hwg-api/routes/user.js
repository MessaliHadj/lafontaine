const express = require('express')
const { Op } = require("sequelize");
const validator = require('validator')
const User = require('../models/user')
const bcrypt = require('bcrypt')
let router = express.Router()

router.get('/user', (req, res)=> {
  User.findAll({attributes: { exclude: ['password'] }, raw: true})
    .then( users => res.json({data: users}) )
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.get('/user/:id', (req, res)=> {
  let userId = parseInt(req.params.id)

  if(!userId) return res.status(400).json({ message: 'Missing paramater' })

  User.findOne({ where: {id: userId}, attributes: { exclude: ['password'] }, raw: true })
    .then( user => {
      return !user ? res.status(404).json({ message: 'This user does not exist !' }) : res.json({ data: user }) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.put('/user', async (req, res) => {
  const { lastname, firstname, email, phone_number, password } = req.body;
  if (!lastname || !firstname || !email || !phone_number || !password) {
    return res.status(400).json({ message: 'Missing data' });
  }

  const newUser = { lastname, firstname, email, phone_number, password };
  try {
    const user = await User.findOne({ where: { [Op.or]: [{ email }, { phone_number }] } });
    if (user) return res.status(400).json({ message: 'This email or phone number already exists' })

    const createdUser = await User.create(newUser);
    res.json({ message: 'User successfully created', data: createdUser })
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const phone_number = req.body.phone_number;
  const password = req.body.password;
  const identifier = email ? email : phone_number;

  if(identifier || !password) return res.status(400).json({ message: 'Missing data' })

  if (email && !validator.isEmail(email)) return res.status(400).json({ message: 'Invalid email format' })

  try {
    const user = await User.findOne({ where: { identifier } });
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!user || !isPasswordValid) {
      return res.status(401).json({ message: 'Invalid identifier or password' });
    }

    // ... (code pour créer un token d'authentification, etc.)
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});

router.patch('/user/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  if (!userId) return res.status(400).json({ message: 'Missing parameter' });

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'This user does not exist!' });

    await User.update(req.body, { where: { id: userId } });

    const updatedUser = await User.findOne({ where: { id: userId }, raw: true });

    res.json({ message: 'User successfully updated', data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});


router.post('/user/untrash/:id', (req, res)=> {
  let userId = parseInt(req.params.id)

  if(!userId) return res.status(400).json({ message: 'Missing paramater' })

  User.restore({ where: {id: userId} })
    .then( user => {
      return !user ? res.status(404).json({ message: 'This user does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.delete('/user/trash/:id', (req, res)=> {
  let userId = parseInt(req.params.id)

  if(!userId) return res.status(400).json({ message: 'Missing paramater' })

  User.destroy({ where: {id: userId} })
    .then( user => {
      return !user ? res.status(404).json({ message: 'This user does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.delete('/user/:id', (req, res)=> {
  let userId = parseInt(req.params.id)

  if(!userId) return res.status(400).json({ message: 'Missing paramater' })

  User.destroy({ where: {id: userId}, force: true })
    .then( user => {
      return !user ? res.status(404).json({ message: 'This user does not exist !' }) : 
      res.status(204).json({}) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

module.exports = router