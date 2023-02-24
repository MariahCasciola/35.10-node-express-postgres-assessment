const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  //create a body
  const updatedPost = {
    ...req.body.data,
    posts_id: res.locals.post.posts_id,
  };
  const data = await service.update(updatedPost);
  res.json({ data });
}

async function destroy(req, res) {
  const { post } = res.locals;
  await service.delete(post.postId);
  res.sendStatus(204);
}

module.exports = {
  create,
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
