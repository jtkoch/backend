const db = require("../data/dbConfig")

function find() {
  return db("posts")
  .select("id", "user_id", "title", "body", "img_url")
}

function findBy(filter) {
  return db("posts")
  .where(filter)
}

function findById(id) {
  return db("posts")
  .select("id", "user_id", "title", "body", "img_url")
  .where({id})
  .first()
}

async function insert(post) {
  return await db("posts")
  .insert(post)
  .returning(["id", "title"])
}

function remove(id) {
  return db("posts")
  .where({id})
  .del()
}

function update(changes, id) {
  return db("posts")
  .where({id})
  .update(changes)
}

module.exports = {
  find,
  findBy,
  findById,
  insert,
  remove,
  update
}