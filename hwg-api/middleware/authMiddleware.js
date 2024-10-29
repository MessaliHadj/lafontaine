const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const { UserError } = require('../services/errorService');

let secret = process.env.JWT_SECRET

const getToken = (req, res)=>{
  let token = req.headers.authorization && authService.extractBearer(req.headers.authorization);
  if(!token) throw new UserError("You do not have permission to make this request", 1);
  return token;
}

exports.checkToken = (req, res, next) => {
  try {
    jwt.verify(getToken(req, res), secret, (err, decodedToken)=>{
      if(err) throw new UserError("This token is not correct", 1)
      req.user = decodedToken;
      next();
    })
  } catch (error) {
    next(error);
  }
}

exports.checkRoles = (req, res, next) => {
  try {
    jwt.verify(getToken(req, res), secret, (err, decodedToken)=>{
      if(err) throw new UserError("This token is not correct", 1)
      if(decodedToken.role === 'user') throw new UserError("Unauthorized request", 2); 
      next();
    })
  } catch (error) {
    next(error);
  }
}

exports.checkRoleAdmin = (req, res, next) => {
  try {
    jwt.verify(getToken(req, res), secret, (err, decodedToken)=>{
      if(err) throw new UserError("This token is not correct", 1)
      if(decodedToken.role !== 'admin') throw new UserError("Unauthorized request", 2); 
      next();
    })
  } catch (error) {
    next(error);
  }
}

exports.checkRequest = (req, res, next) => {
  try {
    jwt.verify(getToken(req, res), secret, (err, decodedToken) => {
      if(err) throw new UserError("This token is not correct", 1)
      if(decodedToken.role === 'user' && decodedToken.id !== parseInt(req.params.id))
        req.params.id = decodedToken.id; 
      next();
    })
  } catch (error) {
    next(error);
  }
}