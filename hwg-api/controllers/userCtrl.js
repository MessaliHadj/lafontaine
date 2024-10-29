const { Op } = require('sequelize')

const User = require('../models/user');
const userService = require('../services/userService');
const { RequestError, UserError } = require('../services/errorService');

exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await User.findAll({
      attributes: { exclude: ['password'] }, 
      raw: true
    })
    return res.json({users: users});
  } catch (error) {
    next(error);
  }
}

exports.getAllUsersWithDeleted = async (req, res, next) => {
  try {
    let users = await User.findAll({
      attributes: { exclude: ['password'] }, 
      paranoid: false
    })
    return res.json({data: users})
  } catch (error) {
    next(error);
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    let userId = parseInt(req.params.id);
    if(!userId)
      throw new RequestError('Invalid or missing parameter');
    
    let user = await User.findOne({ 
      where: {id: userId},
      attributes: { exclude: ['password'], raw: true} 
    });
    
    if(!user) 
      throw new UserError('This user does not exist !', 0);

    return res.json({data: user});
  } catch (error) {
    next(error);
  }
}

exports.getUserDeletedById = async (req, res)=>{
  try {
    let userId = parseInt(req.params.id);
    if(!userId) 
      throw new UserError('Invalid or missing parameter');
    
    let user = await User.findOne({ 
      where: {id: userId}, 
      raw: true, 
      paranoid: false 
    });
  
    if (!user) throw new UserError('Invalid id', 0);
    return res.json({data: user});
  } catch (error) {
    next(error);
  }
}

exports.getUserByEmailOrPhone = async (req, res, next) => {
  try {
    const { email, phone_number } = req.body;
    if((!email && !phone_number)) 
      throw new AuthenticationError('Bad request please verify your informations')
    
    let user = await User.findOne({ 
      where: { [Op.or]: [{ email }, { phone_number }] },
      attributes: { exclude: ['password'], raw: true},
      paranoid: false 
    });
    
    if (!user) throw new UserError('This user does not exist !', 0);
    return res.json({data: user});
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    let userId = parseInt(req.params.id);
    if(!userId) throw new RequestError('Invalid or missing parameter');
    
    let user = await User.findOne({ where: {id: userId}, raw: true });
    
    if (!user) throw new UserError('Invalid id', 0);
  
    user = await User.update(req.body, { where: {id: userId} })
    return res.status(201).json({msg: 'User successfully updated', user: user});
  } catch (error) {
    next(error);
  }
}

exports.restoreUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    if(!userId) throw new UserError('Invalid or missing parameter');

    await User.restore({ where: {id: userId} });
    return res.status(201).json({msg: 'User successfully restored'});
  } catch (error) {
    next(error);
  }
}

exports.softDeleteUser = async (req, res) => {  
  try {
    let userId = parseInt(req.params.id);
    if(!userId) throw new UserError('Invalid or missing parameter');

    await User.destroy({ where: {id: userId} });
    return res.status(204).json({msg: 'User successfully deleted'});
  } catch (error) {
    next(error);
  }
}

exports.hardDeleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    if(!userId) throw new UserError('Invalid or missing parameter');

    await User.destroy({ where: {id: userId}, force: true });
    return res.status(204).json({msg: 'User successfully deleted'});
  } catch (error) {
    next(error);
  }
}