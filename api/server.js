const express = require("express")
const helmet = require("helmet")   
const cors = require("cors")
const restricted = require("../auth/restricted.js")

const usersRouter = require("../users/users-router.js")
const authRouter = require("../auth/auth-router.js")
const postsRouter = require("../posts/posts-router.js")

const server = express()

server.use(express.json())
server.use(logger)
server.use(cors())
server.use(helmet())

server.use("/api/users", logger, restricted, usersRouter)
server.use("/api/auth", logger, authRouter)
server.use("/api/posts", logger, restricted, postsRouter)

server.get("/", (req, res) =>{
    res.status(200).json({message: "Welcome to the Expat-Journal API"})
})

module.exports = server

// logger middleware
function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
        'Origin'
      )}`
    );
  
    next();
  }