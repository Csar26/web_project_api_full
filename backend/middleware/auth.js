require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization ) {
    return res
      .status(403)
      .send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(403)
      .send({ message: 'Authorization required' });
  }

  req.user = payload;

  next();
};