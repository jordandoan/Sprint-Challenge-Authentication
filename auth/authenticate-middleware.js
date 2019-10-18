/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const secret = "HELLO I AM NOT HERE";

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ you: 'shall not pass!' });
    } else {
      req.decoded = decodedToken;
      next();
    }
  })
};
