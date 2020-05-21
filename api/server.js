const express = require("express")
const helmet = require("helmet")   
const cors = require("cors")
const restricted = require("../auth/restricted.js")

//routers
const usersRouter = require("../users/users-router.js")
const authRouter = require("../auth/auth-router.js")
const postsRouter = require("../posts/posts-router.js")

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

//routes
server.use("/api/users", restricted, usersRouter)
server.use("/api/auth", authRouter)
server.use("/api/posts", restricted, postsRouter)

server.get("/", (req, res) =>{
    res.status(200).json({message: "Welcome to the API"})
})

module.exports = server