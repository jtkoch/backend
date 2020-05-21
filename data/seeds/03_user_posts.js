exports.seed = async function(knex) {
	await knex("user_posts").insert([
    {user_id: "1", posts_id: "1"},
    {user_id: "1", posts_id: "2"},
    {user_id: "1", posts_id: "3"},
    {user_id: "2", posts_id: "4"},
    {user_id: "2", posts_id: "5"},
	])
}