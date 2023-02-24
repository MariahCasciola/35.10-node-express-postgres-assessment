const knex = require("../db/connection");

function create(post) {
  return knex("posts")
    .insert(post)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}

function update(updatedPost) {
  return knex("posts")
    .where({ posts_id: updatedPost.posts_id })
    .update(updatedPost, "*");
}

function destroy(postId) {
  return knex("posts").where({ postId }).del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
