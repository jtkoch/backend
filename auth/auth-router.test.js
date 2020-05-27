const request = require('supertest')
const server = require('../api/server.js')
const db = require('../data/dbConfig.js')

describe("auth-router", () => {
  beforeEach(async () => {
    await db("users").truncate();
  })

  describe("POST api/auth/register", () => {

    it("Should return 200 on valid register", () => {
      return request(server)  
        .post('/api/auth/register')
        .send({ 
          username: "test_user",
          password: "password", 
          first_name: "jim",
          last_name: "halpert",
          email: "jimhalpert@gmail.com"
        })
        .then(res => {
          expect(res.status).toBe(200)
      })
  })  
  it("Should return a 500 error for inputing an incorrect password", () => {
    return request(server)
      .post('/api/auth/register')
      .send({ 
        username: "test_user",
        first_name: "jim",
        last_name: "halpert",
        email: "jimhalpert@gmail.com"
      })
      .then(res => {
        expect(res.status).toBe(500)
    })
  })
})

  describe("POST /api/auth/login", () => {

  it("Should return 401 error", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "", 
        password: ""
      })
      .then(res => {
        expect(res.status).toBe(401)
      })
    })
  })
})  