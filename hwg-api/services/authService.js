const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let secret = process.env.JWT_SECRET
let during = { expiresIn: process.env.JWT_DURING }

const extractBearer = authorization => {
  if (typeof authorization !== 'string') return false;

  const verif = authorization.match(/(bearer)\s+(\S+)/i);
  return verif && verif[2];
}

const comparePassword = async (password, userPassword) => {
  try {
    return validPassword = await bcrypt.compare(password, userPassword);
  } catch (error) {
    throw new Error(error);
  }
}

const generateToken = user => {
  try {
    return token = jwt.sign({
      id: user.id, 
      role: user.role, 
      user: user.email || user.phone_number
    }, secret, during)
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { extractBearer, comparePassword, generateToken }