const request = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")
const jwt = require("jsonwebtoken")
const {jwtSecret} = require("../config/secrets.js")

beforeEach(async () => {
  await db("posts").truncate()
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



describe("Posts-Router Tests", () => {
  it("Should run the test", () => {
    expect(true).toBe(true);
  })
})

describe("test environment", () => {
  it("should use test environment", () => {
      expect(process.env.DB_ENV).toBe("testing")
  })
})

describe("Post-Router Endpoints", () => {

  test("GET /api/posts", async () => {
    const res = await request(server)

    .get("/api/posts")
    .set("authorization", token)

    expect(200)
    expect(res.type).toMatch(/json/)
    expect(res.body)
  })

  test("GET /api/posts/:id", async () => {
    const res = await request(server)

    .get("/api/posts/1")
    .set("authorization", token)

    expect(200)
    expect(res.type).toMatch(/json/)
    expect(res.body.user_id)
    expect(res.body.title)
    expect(res.body.body)
    expect(res.body.img_url)
  })

  test("POST /api/posts", async () => {
    const res = await request(server)

    .post("/api/posts")
    .set("authorization", token)
    .send({
      user_id: 1,
      title: "Test Post",
      body: "Testing out a new post",
      img_url: "https://unsplash.com/photos/7Zb7kUyQg1E"
    })

    expect(200)
    expect(res.type).toMatch(/json/)
    expect(res.body.user_id)
    expect(res.body.title)
    expect(res.body.body)
    expect(res.body.img_url)
  })

  test("PUT /api/posts/:id", async () => {
    const res = await request(server)

    .put("/api/posts/1")
    .set("authorization", token)

    expect(201)
    expect(res.type).toMatch(/json/)
    expect(res.body.user_id)
    expect(res.body.title)
    expect(res.body.body)
    expect(res.body.img_url)
  })

  test("DELETE /api/posts/:id", async () => {
    const res = await request(server)

    .delete("/api/posts/1")
    .set("authorization", token)

    expect(200)
    expect(res.type).toMatch(/json/)
    expect(res.body.success)
    expect(res.body.id)
  })
})