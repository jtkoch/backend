exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments()
    table.string("username").notNull().unique()
    table.string("password").notNull()
    table.string("first_name").notNull()
    table.string("last_name").notNull()
    table.string("email").notNull().unique()
  })

  await knex.schema.createTable("posts", (table) => {
    table.increments()
    table.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")    
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.string("title").notNull()
    table.string("body").notNull()
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNull()  
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
  await knex.schema.dropTableIfExists("posts")
}
