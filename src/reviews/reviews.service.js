const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//const tableName = "reviews";
//done
function destroy(review_id) {
  // TODO: Write your code here
  return knex("reviews")
  .where({ review_id: review_id })
  .del();
}

// async function list(movie_id) {
//   // TODO: Write your code here
  
// }
//done
function read(id) {
  // TODO: Write your code here
  return knex("reviews")
  .select("*")
  .where({ review_id: id })
  .first();
}

// async function readCritic(critic_id) {
//   return db("critics").where({ critic_id }).first();
// }

// async function setCritic(review) {
//   review.critic = await readCritic(review.critic_id);
//   return review;
// }
const addCritic = mapProperties({
  c_critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at",
});


function listCritics(review_id){
  return knex("reviews as r")
  .join("critics as c", "r.critic_id", "c.critic_id")
  .select("r.*", "c.*")
  .where({ "r.review_id": review_id })
  .then((data) => data.map(r => addCritic(r)))
}


function update(updatedReview) {
  const { review_id } = updatedReview
  return knex("reviews")
      .select("*")
      .where({ review_id })
      .update(updatedReview, "*")
      .then(() => {
      return read(review_id)
  })
      .then(() => listCritics(review_id))
      .then(updatedRecords => updatedRecords[0])
}

module.exports = {
  destroy,
  //list,
  read,
  update,
};
