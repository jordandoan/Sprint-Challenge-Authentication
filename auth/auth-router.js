const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const Users = require('./auth-model');

const secret = "HELLO I AM NOT HERE";

router.get('/', (req,res) => {
  res.status(200).json({message: "home"})
})

router.post('/register', authBody, (req, res) => {
  const hash = bcrypt.hashSync(req.user.password, 15);
  req.user.password = hash;
  Users.addUser(req.user)
    .then(id => res.status(201).json({id}))
    .catch(err => res.status(500).json({message: "Error adding user to database"}))
});

router.post('/login', authBody, (req, res) => {
  Users.findUser(req.user.username)
    .then(user => {
      if (user && bcrypt.compareSync(req.user.password, user.password)) {
        const token = generateToken(user);
        res.status(201).json({token});
      } else {
        res.status(400).json({message: "Invalid credentials."});
      }
    })
});

function authBody (req, res, next) {
  console.log(req.body);
  const user = req.body;
  if (user) {
    if (user.password && user.username) {
      req.user = user;
      next();
    } else {
      res.status(400).json({message: "Both username and password are required."})
    }
  } else {
    res.status(400).json({message: "Body is required"})
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    user: user.username,
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secret, options); // this method is synchronous
}

module.exports = router;
