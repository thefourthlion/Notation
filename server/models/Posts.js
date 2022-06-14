const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please provide username"],
    },
    userID: {
      type: String,
      require: [true, "Please provide userID"],
    },
    title: {
      type: String,
      required: [true, "Please provide title"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    imageLink: {
      type: String,
      default: "",
    },
    videoLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", PostSchema);

module.exports = Posts;
