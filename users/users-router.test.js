const request = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")
const jwt = require("jsonwebtoken")
const {jwtSecret} = require("../config/secrets.js")

beforeEach(async () => {
  await db("users").truncate()
})

// initialize test user credentials
const user = {
  username: "test_user",
  password: "password", 
  first_name: "jim",
  last_name: "halpert",
  email: "jimhalpert@gmail.com"
}


// declare token generation function
function generateToken(user) {
    
  const payload = {
    username: user.username,
    role: user.role || "user",
  };

  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, jwtSecret, options)
}

// initialize token
const token = generateToken(user)



describe("Users-Router Tests", () => {
  it("Should run the test", () => {
    expect(true).toBe(true);
  })
})

describe("test environment", () => {
  it("should use test environment", () => {
      expect(process.env.DB_ENV).toBe("testing")
  })
})

describe("Users-Router Endpoints", () => {

  test("GET /api/users", async () => {
    const res = await request(server)

    .get("/api/users")
    .set("authorization", token)

    expect(200)
    expect(res.type).toMatch(/json/)
    expect(res.body.username)
    expect(res.body.first_name)
    expect(res.body.last_name)
    expect(res.body.email)
  })

  test("GET /api/users/:id", async () => {
    const res = await request(server)

    .get("/api/users/1")
    .set("authorization", token)

    expect(200)
    expect(res.type).toMatch(/json/)        
    expect(res.body.username)
    expect(res.body.first_name)
    expect(res.body.last_name)
    expect(res.body.email)
  })

  test("GET /api/users/:id/posts", async () => {
    const res = await request(server)

    .get("/api/users/1/posts")
    .set("authorization", token)

    expect(200)
    expect(res.type).toMatch(/json/)
    expect(res.body)
  })

  test("PUT /api/users/:id", async () => {
    const res = await request(server)

    .put("/api/users/1")
    .set("authorization", token)

    expect(201)
    expect(res.type).toMatch(/json/)
    expect(res.body.username)
    expect(res.body.first_name)
    expect(res.body.last_name)
    expect(res.body.email)
  })

  test("DELETE /api/users/:id", async () => {
    const res = await request(server)

    .delete("/api/users/1")
    .set("authorization", token)

    expect(200)
    expect(res.type).toMatch(/json/)
    expect(res.body.success)
    expect(res.body.id)
  })

})