const router = require("express").Router()
const Users = require("./users-model")
const Posts = require("../posts/posts-model")
const bcrypt = require("bcryptjs")

// Get users
router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to get users",
      })
    })
})

// Get user By Id
router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(401).json({
          message: `User of ID ${req.params.id} does not exist`
        })
      } else {
        res.status(200).json(user)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to get user with that ID",
      })
    })
})

// Get users posts
router.get("/:id/posts", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if(user) {
        Posts.findBy({user_id: user.id})
          .then(posts => {
            res.status(200).json(posts)
          })
          .catch(err => {
            res.status(401).json({
              message: `Failed to get posts for ${user.username}`,
            })
          })
      } else {
          res.status(401).json({
            message: `Failed to get user with ID ${req.params.id}`,
          })
        }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to get users posts",
      })
    })
})

// Update user
router.put("/:id", (req, res) => {
  const {id} = req.params
  const updatedUser = req.body
  Users.findById(id)
    .then(user => {
      console.log("Found User:", user)
      console.log("Updated User:", updatedUser)

      if(user && bcrypt.compareSync(updatedUser.password, user.password)) {
        console.log("user password not changed")
        Users.update(updatedUser, id)
          .then(updated => {
            res.status(201).json({
              success: "updated", id: user.id, updated: updatedUser,
            })
          })
      } else if (user && (!bcrypt.compareSync(updatedUser.password, user.password))) {
        console.log("user password was changed")
        const hash = bcrypt.hashSync(updatedUser.password, 8) // hashes the updated password
        updatedUser.password = hash // sets the updated user password value to a hashed password
        Users.update(updatedUser, id).then(updated => {
          res.status(201).json({
            success: "updated", id: user.id, updated: updatedUser,
          })
        })
      } else {
        res.status(401).json({
          message: `Could not find user with id ${id}`,
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Failed to update User",
      })
    })
})

// Delete user
router.delete("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if(user) {
        Users.remove(req.params.id)
          .then(removed => {
            res.status(200).json({
              success: "deleted", id: user.id,
            })
          })
          .catch(err => {
            res.status(500).json({
              message: `Failed to delete user with id ${req.params.id}`,
            })
          })
      } else {
        res.status(401).json({
          message: `Could not find user with id ${req.params.id}`,
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to delete user",
      })
    })
})

module.exports = router