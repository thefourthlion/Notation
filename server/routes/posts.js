const express = require("express");

const router = express.Router();

const {
  createPost,
  readPosts,
  deletePost,
  readPostFromUser,
} = require("../controllers/posts");

router.route("/post").post(createPost);
router.route("/read").get(readPosts);
router.route("/read/:id").get(readPostFromUser);
router.route("/delete/:id").delete(deletePost);

module.exports = router;
