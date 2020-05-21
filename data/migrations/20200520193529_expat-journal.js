exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.string("username").notNull().unique()
    table.string("password").notNull()
    table.string("first_name").notNull()
    table.string("last_name").notNull()
    table.string("email").notNull().unique()
  })

  await knex.schema.createTable("posts", (table) => {
    table.increments("id")
    table.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")    
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
    table.string("title").notNull()
    table.string("body").notNull()
    table.string("img_url").notNull()
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNull()  
  })

  await knex.schema.createTable("user_posts", (table) => {
    table.integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")

    table.integer("posts_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("user_posts")
  await knex.schema.dropTableIfExists("posts")
  await knex.schema.dropTableIfExists("users")
}
