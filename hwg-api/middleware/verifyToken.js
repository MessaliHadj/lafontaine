const jwt = require('jsonwebtoken')

let secret = process.env.JWT_SECRET

const extractBearer = authorization => {
  if(typeof(authorization) !== 'string') {return false}
  const matches = authorization.match(/(bearer)\s+(\S+)/i)
  return matches && matches[2]
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && extractBearer(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "This token is not correct" });
    }
    req.user = decodedToken;
    next();
  });
};

module.exports = verifyToken