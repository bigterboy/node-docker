const express = require("express");

const postControl = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, postControl.getAllPost)
  .post(protect, postControl.createPost);

router
  .route("/:id")
  .get(pprotect, ostControl.getOnePost)
  .patch(protect, postControl.updatePost)
  .delete(protect, postControl.deletePost);

module.exports = router;
