const knex = require("../db/connection");

function list() {
  return knex("comments").select("*");
}

function listCommenterCount() {
  return knex("comments as c")
    .join("users as u", "u.user_id", "c.commenter_id")
    .select("u.user_email as commenter_email")
    .count("c.comment_id")
    .groupBy("commenter_email")
    .orderBy("commenter_email")
    .then((data)=>data.map((elements)=>{return {...elements, count: Number(elements.count)}}))
    //orderBy varchar would be alphabetical
}

function read(commentId) {
  // your solution here
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
