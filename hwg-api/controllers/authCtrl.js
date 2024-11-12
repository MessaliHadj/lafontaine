const validator = require('validator')
const { Op } = require('sequelize')

const User = require('../models/user');
const Refresh = require('../models/refresh');
const authService = require('../services/authService');
const { AuthenticationError } = require('../services/errorService');

const getRefreshToken = async (user, res) => {
  try {
    const storedToken = await Refresh.findOne({ 
      where: { userId: user.id }
    });
    if (storedToken) {
      const expiresAt = new Date(storedToken.expiresAt).setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today); 
      tomorrow.setDate(today.getDate() + 1);

      if (expiresAt === today || expiresAt === tomorrow) {
        await Refresh.destroy({ where: {id: storedToken.id}, force: true });
        return null;
      } else {
        return storedToken;
      }
    } else {
      return null      
    }

  } catch (error) {
    throw new Error(error);
  }
};

const setRefreshToken = async (user, res) => {
  try {
    const refreshToken = await authService.generateRefreshToken(user);
    await Refresh.create({
      userId: user.id,
      refreshToken,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, 
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/v1/auth/refresh'
    });

    const access_token = authService.generateToken(user);
    return access_token;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAuth = async (req, res, next) => {
  try {
    const { email, phone_number, password } = req.body;
  
    if((!email && !phone_number) || !password) 
      return res.status(400).json({message: 'Bad request please verify your informations'})
    
    if (email && !validator.isEmail(email)) 
      throw new AuthenticationError('Invalid email format')
    
    let user = await User.findOne({ 
      where: {[Op.or]: [
        { email: email || null }, 
        { phone_number: phone_number || null }
      ]}
    })
      
    if(!user) 
      return res.status(400).json({message: 'Bad request please verify your informations'})
    let verif = await authService.comparePassword(password, user.password);
    if(!verif) 
      return res.status(400).json('Bad request please verify your informations');

    let accessToken;
    let refreshExist = await getRefreshToken(user, res);
    if (refreshExist) {
      accessToken = authService.generateToken(user)
    }else{
      accessToken = await setRefreshToken(user, res);
    }

    let resUser = {
      id: user.id,
      lastname: user.lastname,
      firstname: user.firstname,
      role: user.role,
      email: user.email,
      phone_number: user.phone_number
    }

    return res.json({access_token: accessToken, user: resUser});
  } catch (error) {
    console.error("Error in getAuth:", error);
    next(error);
  }
};

exports.getNewAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    let userId = parseInt(req.params.id);

    if (!refreshToken || !userId) {
      return res.status(403).json({ message: 'Invalid or missing parameter' });
    }

    const storedToken = await Refresh.findOne({ 
      where: { userId: userId }
    });

    if (!storedToken) return res.status(403).json({ message: "Invalid refresh token" });
    const isValid = await authService.compareRefreshToken(refreshToken, storedToken.refreshToken);
    if (!isValid) return res.status(403).json({ message: "Invalid refresh token" });

    let user = await User.findOne({ where: {id: userId}, raw: true });

    // Générer un nouveau token d'accès
    const newAccessToken = authService.generateToken(user);
    res.json({ access_token: newAccessToken });
  } catch (error) {
    next(error);
  }
};

// exports.setRefreshToken = async (req, res, next) => {
//   try {
//     const { refreshToken } = req.cookies;

//     if (!refreshToken) {
//       return res.status(403).json({ message: "No token found" });
//     }

//     const storedToken = await Refresh.findOne({ 
//       where: { userId: req.user.id }
//     });

//     const isValid = await bcrypt.compare(refreshToken, storedToken.refreshToken);
//     if (!isValid) return res.status(403).json({ message: "Invalid refresh token" });

//     // Générer un nouveau token d'accès
//     const newAccessToken = authService.generateToken(storedToken.userId);
//     res.json({ access_token: newAccessToken });
//   } catch (error) {
//     next(error);
//   }
// };