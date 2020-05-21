exports.seed = async function(knex) {
	await knex("user_posts").truncate()
	await knex("posts").truncate()
	await knex("users").truncate()
}