const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Users = require("../users/users-model")
const { jwtSecret } = require("../config/secrets")

// New User
router.post("/register", (req, res) => {
  let newUser = req.body
  const hash = bcrypt.hashSync(newUser.password, 8)
  newUser.password = hash
  console.log("The user is:", newUser)
  Users.insert(newUser)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Failed to add new user", userSent: req.body
      })
    })
})

// Login
router.post("/login", (req,res) => {
  let { username, password } = req.body
  
  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
            id: user.id,
            username: user.username
          })
      } else {
        res.status(401).json({
          message: "Invalid Credentials",
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "Internal error, cannot log in",
      })
    })
})

// Generates a token
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || "user",
  }

  const options = {
    expiresIn: "1h",
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router