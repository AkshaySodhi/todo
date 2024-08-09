import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
    maxLength: 200,
  },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
