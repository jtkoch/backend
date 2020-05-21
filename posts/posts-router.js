const router = require("express").Router()
const express = require("express")
const Posts = require("./posts-model")

// Get all posts
router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to get posts",
      })
    })
})

// Get post by id
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if(!post) {
        res.status(401).json({
          message: `The post of ID ${req.params.id} does not exist`,
        })
      } else {
        res.status(200).json(post)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to get post with that ID",
      })
    })
})  

// New post
router.post("/", (req, res) => {
  let newPost = req.body
  Posts.insert(newPost)
    .then(newPost => {
      res.status(200).json({
        success: "You have successfully created a new post",
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to add new post",
      })
    })
})

// Update post
router.put("/:id", (req, res) => {
  const {id} = req.params
  const changes = req.body
  
  Posts.findById(id)
    .then(post => {
      if(post) {
        Posts.update(changes, id)
          .then(updated => {
            res.status(201).json({
              success: "updated", id: post.id, ...changes,
            })
          })
      } else {
        res.status(401).json({
          message: `Could not find post with ID ${id}`,
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to update post",
      })
    })
})

// Delete post
router.delete("/:id", (req, res) => {
  Posts.findById(req.params.id).then(post =>{
    if(post) {
      Posts.remove(req.params.id)
        .then(removed => {
          res.status(200).json({
            success: "deleted", id: post.id,
          })
        })
        .catch(err => {
          res.status(500).json({
            message: `Failed To Delete Post with ID ${req.params.id}`,
          })
        })
      } else {
        res.status(401).json({
          message: `Could not Find Post w/ ID: ${req.params.id}`,
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed To Delete Posts',
      })
    })
})

module.exports = router