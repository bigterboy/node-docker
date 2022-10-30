const express = require("express");

const postControl = require("../controllers/postController");

const router = express.Router();

router.route("/").get(postControl.getAllPost).post(postControl.createPost);

router
  .route("/:id")
  .get(postControl.getOnePost)
  .patch(postControl.updatePost)
  .delete(postControl.deletePost);

module.exports = router;
