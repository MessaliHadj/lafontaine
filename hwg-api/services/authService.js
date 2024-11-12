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

const generateToken = (user, time = during) => {
  try {
    return token = jwt.sign({
      id: user.id, 
      role: user.role, 
      user: user.email || user.phone_number
    }, secret, time)
  } catch (error) {
    throw new Error(error);
  }
}

const compareRefreshToken = async (refresh, refreshStored) => {
  try {
    return isValid = await bcrypt.compare(refresh, refreshStored);
  } catch (error) {
    throw new Error(error);
  }
}

const generateRefreshToken = async (user) => {
  // Renvoie le refresh token brut pour l’envoyer en tant que cookie
  return generateToken(user, { expiresIn: '7d' });
};

module.exports = { extractBearer, comparePassword, generateToken, compareRefreshToken, generateRefreshToken }