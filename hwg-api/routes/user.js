const express = require('express')
const validator = require('validator')
const User = require('../models/user')
let router = express.Router()

router.get('', (req, res)=> {
  User.findAll()
    .then( users => res.json({ data: users }) )
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.get('/:id', (req, res)=> {
  let userId = parseInt(req.params.id)

  if(!userId) return res.status(400).json({ message: 'Missing paramater' })

  User.findOne({ where: {id: userId}, raw: true })
    .then( user => {
      return !user ? res.status(404).json({ message: 'This user does not exist !' }) : res.json({ data: user }) 
    })
    .catch( err => res.status(500).json({ message: 'Database Error', error: err}))
})

router.put('', async (req, res) => {
  const { lastname, firstname, email, phone_number, password } = req.body;
  if(!lastname || !firstname || !email || !phone_number || !password) return res.status(400).json({ message: 'Missing data' })

  const newUser = { lastname, firstname, email, phone_number, password };
  try {
    const user = await User.findOne({ where: { $or: [{ email }, { phone_number }] } });
    if (user) return res.status(400).json({ message: 'This email or phone number already exists' })

    const createdUser = await User.create(newUser);
    res.json({ message: 'User successfully created', data: createdUser });
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

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({ message: 'Invalid identifier or password' });
    }

    // ... (code pour créer un token d'authentification, etc.)
  } catch (err) {
    res.status(500).json({ message: 'Database Error', error: err });
  }
});