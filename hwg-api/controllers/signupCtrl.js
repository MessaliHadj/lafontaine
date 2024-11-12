const { Op } = require('sequelize')

const User = require('../models/user');
const authService = require('../services/authService');
const userService = require('../services/userService');
const { RequestError, UserError } = require('../services/errorService');

exports.setNewUser = async (req, res, next) => {
  try {
    const { lastname, firstname, email, phone_number, password } = req.body;
    if (!lastname || !firstname || !email || !phone_number || !password)
      throw new RequestError('Invalid or missing parameter');

    const newUser = { lastname, firstname, email, phone_number, password };
    
    let user = await User.findOne({ 
      where: { [Op.or]: [{ email }, { phone_number }] },
      paranoid: false, 
      raw: true 
    });

    if(user) 
      throw new UserError('This email or phone number already exists', 1);

    const createdUser = await User.create(newUser)

    return res.status(201).json({
      message: 'User successfully created', 
      access_token: authService.generateToken(createdUser)
    });
  } catch (error) {
    next(error);
  }
}