exports.seed = async function(knex) {
	await knex("posts").insert([
    {
      user_id: 1, 
      title: "Post1",
      body: "This is a post from my very first trip abroad",
      img_url: "https://unsplash.com/photos/A5rCN8626Ck"
    },
    {
      user_id: 1,
      title: "Post2",
      body: "This is a post from my trip to Amsterdam",
      img_url: "https://unsplash.com/photos/t2hgHV1R7_g"
    },
    {
      user_id: 1,
      title: "Post3",
      body: "This is a post from my trip to Australia",
      img_url: "https://unsplash.com/photos/7Zb7kUyQg1E"
    },
    {
      user_id: 2,
      title: "Post1",
      body: "This is my very first post! This is when I lived in Ecuador for 7 years",
      img_url: "https://unsplash.com/photos/5BnLjFXTnmE"
    },
    {
      user_id: 2,
      title: "Post1",
      body: "After Ecuador I moved to Mexico City, What a lovely place",
      img_url: "https://unsplash.com/photos/KbR06h9dNQw"
    }
	])
}