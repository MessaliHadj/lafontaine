const validator = require('validator')
const { Op } = require('sequelize')

const User = require('../models/user');
const authService = require('../services/authService');
const { AuthenticationError } = require('../services/errorService');

exports.getAuth = async (req, res, next) => {
  try {
    const { email, phone_number, password } = req.body;
  
    if((!email && !phone_number) || !password) 
      throw new AuthenticationError('Bad request please verify your informations')

    if (email && !validator.isEmail(email)) 
      throw new AuthenticationError('Invalid email format')
  
    let user = await User.findOne({ 
      where: {[Op.or]: [
          { email: email || null }, 
          { phone_number: phone_number || null }
        ]} 
      })

    let verif = await authService.comparePassword(password, user.password);

    if(!user || !verif) 
      throw new AuthenticationError('Bad request please verify your informations');
    return res.json({access_token: authService.generateToken(user)});
  } catch (error) {
    next(error);
  }
};